import React from 'react';
import './NavBar.css';

const NavBar = () => {

    return (
        <ul>
        <li><a class="active" href="/">Home</a></li>
        <li><a href="/image-search">Image Search</a></li>
        </ul>
    );
}

export default NavBar;