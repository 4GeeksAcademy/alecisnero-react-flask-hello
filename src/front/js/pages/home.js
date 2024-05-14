import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js"

export const Home = () => {
	const { store, actions } = useContext(Context);

	

	return (
		<div>
			<Navbar />
			<h1 className="text-center">ESTOY EN HOME!</h1>
			
		</div>
	);
};
