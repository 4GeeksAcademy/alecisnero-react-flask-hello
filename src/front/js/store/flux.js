const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: '',


			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			createUser: async (formUserSignup) =>{
				try{
					const respCreateUser = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formUserSignup)
					} )

					if(!respCreateUser){
						throw new Error('se genero el siguiente error')
					}

					const dataCreateUser = await respCreateUser.json()

					console.log(formUserSignup)
					console.log(dataCreateUser)
					
				}
				catch(error){
					console.error("Error presentado:", error)
				}	
			},

			loginIn: async (formLoginIn) => {
				const storeLogin = getStore() 
				try{
					const respLoginIn = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formLoginIn)
					})

					if(!respLoginIn){
						throw new Error('New error generado')
					}

					const dataLoginIn = await respLoginIn.json()
					setStore( {token: dataLoginIn.access_token} )
					console.log(storeLogin.token)

				}catch(error){
					console.error('Se ha presentado un error: ', error)
				}
			},

			getUser: async() => {
				const storeUser = getStore()
				try{
					

					const respGetUsers = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: {
							'Content-type':'application/json',
							'Authorization': 'Bearer ' + storeUser.token
						}
					})

					const dataGetUser = await respGetUsers.json()
					console.log(dataGetUser)

				}catch(error){
					console.error('Se ha presentado el siguiente error: ', error)
				}
			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},




			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// },
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// }
		}
	};
};

export default getState;
