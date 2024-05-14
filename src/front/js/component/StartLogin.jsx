import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const StartLogin = () => {
    const { store, actions } = useContext(Context);
    const [formLoginIn, setFormLoginIn] = useState({
        email: '',
        password: ''/* ,
        isActive: false, // Inicializamos isActive como false
        isActive2: false */
    });

    function handlerChangeLoginIn(eve) {
        const { name, value, type, checked } = eve.target;

        // Si es un checkbox, actualizamos con el valor checked
        const newValue = type === 'checkbox' ? checked : value;

        setFormLoginIn(prev => ({
            ...prev,
            [name]: newValue
        }));
    }

    function handlerLoginIn(eve) {
        eve.preventDefault();
        if (formLoginIn.email !== '' && formLoginIn.password !== '') {
            actions.loginIn(formLoginIn)
        }
    }

    console.log(formLoginIn);

    return (
        <div>
            <h1>Iniciar Sesión</h1>

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
                    placeholder='Ingrese password'
                />

                {/* <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={formLoginIn.isActive}
                        onChange={handlerChangeLoginIn}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        User
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="isActive"
                        checked={formLoginIn.isActive2}
                        onChange={handlerChangeLoginIn}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        teacher
                    </label>
                </div> */}

                <button type="submit" onClick={handlerLoginIn}>
                    Login In
                </button>
            </form>

            <div>
                {
                    store.user.map((item, index)=>{
                        return(
                            <div key={index}>
                                <p>{item.email}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
