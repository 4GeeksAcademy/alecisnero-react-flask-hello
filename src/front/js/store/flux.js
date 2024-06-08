const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: [],
	  msg: '',
	  error: '',

      message: null,
    },
    actions: {
      createUser: async (formUserSignup) => {
		getActions().updateMsgError("");
        getActions().updateMsg("");
        try {
          const respCreateUser = await fetch(
            process.env.BACKEND_URL + "/api/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formUserSignup),
            }
          );

    
		  if (!respCreateUser.ok) {
            const errorData = await respCreateUser.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Failed to login");
          }
          const dataCreateUser = await respCreateUser.json();
		  setStore({ ...store, msg: dataCreateUser.message });

        } catch (error) {
          console.error("Error al crear el usuario:", error);
        }
      },

	  loginIn: async (userToLogin) => {
        const store = getStore();
        localStorage.setItem("userToLogin", JSON.stringify(userToLogin));
        getActions().updateMsgError("");
        getActions().updateMsg("");
        try {
          const respLoginIn = await fetch(
            process.env.BACKEND_URL + `/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userToLogin),
            }
          );

          if (!respLoginIn.ok) {
            const errorData = await respLoginIn.json();
            setStore({ ...store, error: errorData.Error });
            throw new Error(errorData.Error || "Failed to login");
          }

          const dataLoginIn = await respLoginIn.json();
          localStorage.setItem("jwt-token", dataLoginIn.access_token)

          setStore({ ...store, msg: dataLoginIn.message });

          await getActions().getUser();

        } catch (err) {
          console.error(err);
        }
      },

      getUser: async () => {
        const store = getStore();
        try {
          const token = localStorage.getItem("jwt-token");
          if (!token) throw new Error("No token found");
          const respGetUsers = await fetch(
            process.env.BACKEND_URL + "/api/private",
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (!respGetUsers.ok) {
            throw new Error(
              "Error al obtener los datos del usuario: " +
                respGetUsers.statusText
            );
          }

          const dataGetUser = await respGetUsers.json();
          setStore({ ...store, user: dataGetUser });
          console.log(store.user);
        } catch (error) {
          console.error("Error al obtener los datos del usuario: ", error);
        }
      },
      checkUserSession: async () => {
        try {
          const token = localStorage.getItem("jwt-token");
          if (token) {
            const store = getStore();
            await getActions().getUser(store.currentRole);
          }
        } catch (error) {
          console.error("Error checking user session: ", error);
        }
      },

      updateMsgError: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, error: changesMsg });
      },

      updateMsg: async (changesMsg) => {
        const store = getStore();
        setStore({ ...store, msg: changesMsg });
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
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
    },
  };
};

export default getState;
