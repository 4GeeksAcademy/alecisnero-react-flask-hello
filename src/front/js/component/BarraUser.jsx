import React from "react";
import { Link } from "react-router-dom";

export const BarraUser = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
                    <a className="navbar-brand">INICIO</a>
                    <div className="d-flex">
                        <Link to='/'>
                            <button className="btn btn-outline-danger m-1" type="submit">Sign Out</button>
                        </Link>
                    </div>
                </div>
		</nav>
	);
};
