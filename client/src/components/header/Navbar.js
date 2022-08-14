import React from 'react'
import { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Rightheader from "./Rightheader";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/action";
// import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";


const Navbar = () => {

    const history = useNavigate();

    const [text, setText] = useState();
    // only for search
    const { products } = useSelector((state) => state.getproductsdata);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const [open, setOpen] = useState(false);
    const [liopen, setLiopen] = useState(true);

    const [dropen, setDropen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { account, setAccount } = useContext(LoginContext);



    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(data);
        }
    };

    useEffect(() => {
        getdetailsvaliduser();
    }, []);

    // for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            
            setAccount(false);
            setOpen(false);
            toast.success("user Logout 😃!", {
                position: "top-center",
            });
            history.push("/");
        }
    };

    // for drawer

    const handleopen = () => {
        setDropen(true);
    };

    const handleClosedr = () => {
        setDropen(false);
    };

    const getText = (text) => {
        setText(text);
        setLiopen(false);
    };
    


    return (
        <header>
            <nav>
                <div className="left">

                    <IconButton className="hamburgur" onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                    {/* here define the right header */}

                    <Drawer open={dropen} onClose={handleClosedr}>
                        <Rightheader userlog={logoutuser} logclose={handleClosedr} />
                    </Drawer>

                    <div className= "navlogo">
                        <NavLink to="/"><img src="./e-shop_logo.jpg" alt="" /></NavLink>
                    </div>

                    <div className="nav_searchbaar">
                        <input
                        type="text"
                        name=""
                        onChange={(e) => getText(e.target.value)}
                        placeholder="Search Your Products"
                        />
                        <div className="search_icon">
                        <i className="fas fa-search" id="search"></i>
                        </div>
                        {text && (
                        <List className="extrasearch" hidden={liopen}>
                            {products
                            .filter((product) =>
                                product.title.longTitle
                                .toLowerCase()
                                .includes(text.toLowerCase())
                            )
                            .map((product) => (
                                <ListItem>
                                    <NavLink
                                        to={`/getproductsone/${product.id}`}
                                        onClick={() => setLiopen(true)}
                                    >
                                        {product.title.longTitle}
                                    </NavLink>
                                </ListItem>
                            ))}
                        </List>
                        )}
                    </div>
                </div>

                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login" >sign in</NavLink>
                    </div>
                    
                    {account ? (
                        <NavLink to="/buynow">
                        <div className="cart_btn">
                            <Badge badgeContent={account.carts.length} color="secondary">
                            <ShoppingCartIcon id="icon"/>
                            </Badge>
                            <p>Cart</p>
                        </div>
                        </NavLink>
                    ) : (
                        <NavLink to="/login">
                        <div className="cart_btn">
                            <Badge badgeContent={0} color="secondary">
                            <ShoppingCartIcon id="icon"/>
                            </Badge>

                            <ToastContainer />

                            <p>Cart</p>
                        </div>
                        </NavLink>
                    )}

                    {account ? (
                        <Avatar
                        className="avtar2"
                        onClick={handleClick}
                        title={account.fname.toUpperCase()}
                        >
                        {account.fname[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <Avatar className="avtar"  />
                    )}

                    <div className="menu_div">
                        <Menu
                        anchorEl={open}
                        open={Boolean(open)}
                        onClose={handleClose}
                        // className={classes.component}
                        >
                        <MenuItem onClick={handleClose} style={{ margin: 10 }}>
                            My account
                        </MenuItem>
                        {account ? (
                            <MenuItem
                            style={{ margin: 10 }}
                            onClick={() => {
                                handleClose();
                                logoutuser();
                            }}
                            >
                            <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
                            </MenuItem>
                        ) : (
                            ""
                        )}
                        </Menu>
                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar