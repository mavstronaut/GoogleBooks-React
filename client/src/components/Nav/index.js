import React from "react";
import "./style.css";

function Nav() {
    return (
        <nav className="nav navbar-expand-leg navbar-dark">
            <a className="nav-link text-info" href="/">
                <h3>GoogleBooks Search</h3>
            </a>

            <a className="nav-link mt-2 text-info" href="/">Find Books</a>
            <a className="nav-link mt-2 text-info" href="/saved">View Saved</a>
        </nav>
    );
};

export default Nav;