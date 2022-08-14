import React from 'react'
import "./newnav.css";

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>All</p>
                <p>Mobile</p>
                <p>Bestseller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Sports</p>
                <p>Today's deal</p>
                <p>Clothes</p>
                <p>Grocery</p>
                <p>Accessory</p>
            </div>
            <div className='right_data'>
                {/* <img src='./nav.jpg' alt="navdata"/> */}
            </div>
        </div>
    </div>
  )
}

export default Newnav