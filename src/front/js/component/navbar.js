import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
                    <a className="navbar-brand">INICIO</a>
                    <p>More about us</p>
                    <div className="d-flex">
                        <Link to='/Registerlogin'>
                            <button className='btn btn-outline-success m-1' type='submit'>Sign Up</button>
                        </Link>
                        <Link to='/loginIn'>
                            <button className="btn btn-outline-success m-1" type="submit">Log In</button>
                        </Link>
                    </div>
                </div>
		</nav>
	);
};
