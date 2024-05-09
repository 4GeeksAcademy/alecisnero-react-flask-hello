import React, {useState, useEffect, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

export const StartLogin = () => {
    const { store, actions } = useContext(Context)
    const [formLoginIn, setFormLoginIn] = useState(
        {
           email: '',
           password: '' 
        }
    )

    function handlerChangeLoginIn(eve){
        eve.preventDefault()
        const {name, value} = eve.target

        setFormLoginIn(
            prev =>({ 
                ...prev,
            [name]: value
        }))
    }

    function handlerLoginIn(eve){
        eve.preventDefault()
        if(formLoginIn.email !== '' && formLoginIn.password !== ''){
            actions.loginIn(formLoginIn)
            
        }
    }

    return(
        <div>
            <h1>Iniciar Seccion</h1>

            <div>
                <form onSubmit={handlerLoginIn}>
                    <input
                    name='email'
                    value={formLoginIn.email} 
                    onChange={handlerChangeLoginIn}
                    type="text" 
                    placeholder='Ingrese email'
                    />

                    <input
                        name='password'
                        value={formLoginIn.password}
                        onChange={handlerChangeLoginIn}
                        type='password'
                        placeholder='ingrese password'  
                    />
                </form>

                <button onClick={handlerLoginIn}>
                    Login In
                </button>

                <button onClick={() => actions.getUser()}>
                    get user
                </button>
                
            </div>

            <div>
                {
                    'mapeo de los users'
                }
            </div>
            
        </div>
    )
}