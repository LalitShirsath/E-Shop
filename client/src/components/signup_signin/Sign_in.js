import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider";

const Sign_in = () => {

    // useState has initial values of inputs
    // logdata will have value entered by user 
    // logdata is updated through setData function
    // whenever user enters some data then adddata function is called

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    const { account, setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;
        
        setData((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    };
 

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;
        // console.log(email);
        try {
            if(email === ""){
                toast.warn("Email cant be blank", {
                    position: "top-center"
                });
            }
            else if(password === ""){
                toast.warn("password cant be blank", {
                    position: "top-center"
                });
            }
            else{
                const res = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    })
                });
    
    
                const data = await res.json();
                console.log(data);
    
                if (res.status === 400 || !data) {
                    console.log("invalid details");
                    toast.error("Invalid Details 👎!", {
                        position: "top-center"
                    });
                } else {
                    setAccount(data);
                    console.log("data valid");
                    setData({ ...logdata, email: "", password: "" })
                    toast.success("Login Successfully done 😃!", {
                        position: "top-center"
                    });
                }
            }
            
        } catch (error) {
            console.log("login page error " + error.message);
        }
    };    


    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./e-shop_logo.jpg" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST">
                        <h1>Sign-In</h1>

                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email" />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password" placeholder="At least 6 characters" />
                        </div>
                        <button type="submit" className="signin_btn" onClick={senddata}>Continue</button>
                    </form>
                </div>
                <div className="create_accountinfo">
                    <p>New to e-shop?</p>
                    <button>  <NavLink to="/register">Create your e-shop Account</NavLink></button>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Sign_in