import React from 'react'
import "../footer/footr.css";


const Footer = () => {

    const year = new Date().getFullYear();
    // console.log(year);

    return (
        <footer>
            <div className="footer_container">
                <div className="footr_details_one">
                    <h3>Get to Know US</h3>
                    <p>About us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>e-shop Cares</p>
                </div>
                <div className="footr_details_one">
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Services</h3>
                    <p>Free shipping</p>
                    <p>Track your order</p>
                    <p>Gift Cards</p>
                </div>
                <div className="footr_details_one forres">
                    <h3>Customer Care</h3>
                    <p>Where is my order</p>
                    <p>Shipping & delivery</p>
                    <p>States sales tax information</p>
                    <p>Payment FAQs</p>
                </div>
            </div>
            <div className="lastdetails">
                <img src="./e-shop_logo.jpg" alt="logo" />
                <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, eshop.com, Inc. or its affiliates</p>
            </div>
        </footer>
    )
}

export default Footer