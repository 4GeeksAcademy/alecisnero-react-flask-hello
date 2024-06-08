import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js"

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [ counter, setCounter ] = useState(0)
	
	
	useEffect(() => {
		let interval = 0
			interval = setInterval(() => {
				setCounter(counter + 1) 
			}, 1000)

		return () => clearInterval(interval)
	}, [counter])

	return (
		<div>
			<Navbar />
			<h1 className="text-center">ESTOY EN HOME!</h1>
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className={`${(counter >=5 && counter <= 10) ? "alert alert-info" : "d-none"}`}>
				{
					(counter >= 5)
						? store.message || "Loading message from the backend (make sure your python backend is running)..." 
						: 'Cargando...'
				}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
			
		</div>
	);
};
