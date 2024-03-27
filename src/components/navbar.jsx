import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchNavbar from "./searchNavbar";

const Navbar = () => {
    return (
        <header>
            <NavLink className = {({isActive}) => isActive && "link-active"} to="/">
                <div className="logo">FAVFLICKS</div>
            </NavLink>
            <SearchNavbar />
            <NavLink className={({isActive})=> isActive && "link-active"} to = '/favorite'>
                <div className="fav">Favorites</div>
            </NavLink>
            
        
        </header>
    );
}

export default Navbar;
