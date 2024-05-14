import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'

export const AddLogin = () => {
    const { store, actions } = useContext(Context)
    const [formLogin, setFormLogin] = useState(
        {
        email: '',
        password: '',
        username: '',
        fullname: '',
    })

    /*Funcion para pasar lo valores del form */
    function handlerChangeLogin(event){
        event.preventDefault()
        const { name, value } = event.target

        setFormLogin(prev => ({
            ...prev,
            [name]: value
        }))
    } 
    
    /**Funcion para limitar form */
    function handlerAddLoginUser(eve){
        eve.preventDefault()
        if(
        formLogin.email !== '' &&
        formLogin.password !== '' &&
        formLogin.username !== '' && 
        formLogin.name !== '' 
        ){
            actions.createUser(formLogin)
        } else {
            alert('No deje dejar campo vacios')
        }

        /**console.log(formLogin)**/
    }
    return(
        <div>
            <div>
                <h1>Registre su User</h1>
            </div>

            <div>
                <form onSubmit={handlerAddLoginUser}>
                    <input
                        name='email'
                        value={formLogin.email}
                        onChange={handlerChangeLogin}
                        type='email'
                        placeholder='email'  
                    />

                    <input
                        name='password'
                        value={formLogin.password}
                        onChange={handlerChangeLogin}
                        type='password'
                        placeholder='password'  
                    />

                    <input
                        name='username'
                        value={formLogin.username}
                        onChange={handlerChangeLogin}
                        type='text'
                        placeholder='username'  
                    />

                    <input
                        name='fullname'
                        value={formLogin.name}
                        onChange={handlerChangeLogin}
                        type='text'
                        placeholder='fullname'  
                    />
                </form>
            </div>
            <div>
                <button onClick={handlerAddLoginUser}>
                    Register user
                </button>
            </div>
        </div>
    )
}