const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],


			message: null,
			
		},
		actions: {

			createUser: async (formUserSignup) => {
				try {
					const respCreateUser = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formUserSignup)
					});
			
					if (!respCreateUser.ok) {
						throw new Error('Error al crear el usuario: ' + respCreateUser.statusText);
					}
			
					const dataCreateUser = await respCreateUser.json();
			
					console.log("Usuario creado:", formUserSignup);
					console.log("Respuesta del servidor:", dataCreateUser);
				} catch (error) {
					console.error("Error al crear el usuario:", error);
				}
			},
			
			loginIn: async (formLoginIn) => {
				try {
					const respLoginIn = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formLoginIn)
					});
			
					if (!respLoginIn.ok) {
						throw new Error('Error al iniciar sesión: ' + respLoginIn.statusText);
					}
			
					const dataLoginIn = await respLoginIn.json();
					localStorage.setItem("jwt-token", dataLoginIn.access_token)
					await getActions().getUser();
					
			
				} catch (error) {
					console.error('Error al iniciar sesión: ', error)
				}
			},
			
			getUser: async () => {
				const store = getStore()
				try {
					const token = localStorage.getItem('jwt-token')
					const respGetUsers = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: {
							'Content-type': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					});
			
					if (!respGetUsers.ok) {
						throw new Error('Error al obtener los datos del usuario: ' + respGetUsers.statusText);
					}
			
					const dataGetUser = await respGetUsers.json();
					setStore({...store, user: dataGetUser})
					console.log(store.user)
				} catch (error) {
					console.error('Error al obtener los datos del usuario: ', error);
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
