import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

import { FaCircleArrowLeft } from "react-icons/fa6";

export const StartLogin = () => {
    const { store, actions } = useContext(Context);
    const [formLoginIn, setFormLoginIn] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()

    function handlerChangeLoginIn(eve) {
        const { name, value } = eve.target;

        setFormLoginIn(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handlerLoginIn(eve) {
        eve.preventDefault();
        if (formLoginIn.email !== '' && formLoginIn.password !== '') {
            actions.loginIn(formLoginIn)
            navigate('/Dashboard')
        }
    }

    function handlerHome() {
        navigate('/')
    }

    function handlerGoToRegister() {
        navigate('/Registerlogin')
    }

    console.log(formLoginIn);

    return (
        <div>


            <div className='row d-flex flex-row'>
                <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                    <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{cursor: "pointer"}}>
                                <FaCircleArrowLeft />
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1>Log In</h1>
                            </div>
                        </div>
                        <form onSubmit={handlerLoginIn}>
                            <div className='col-md my-3'>
                                <label className='my-2'>Email</label>
                                <input
                                    name='email'
                                    value={formLoginIn.email}
                                    onChange={handlerChangeLoginIn}
                                    type="text"
                                    placeholder='Ingrese email'
                                    className="form-control"
                                />
                            </div>

                            <div className='col-md my-3'>
                                <label className='my-2'>Password</label>
                                <input
                                    name='password'
                                    value={formLoginIn.password}
                                    onChange={handlerChangeLoginIn}
                                    type='password'
                                    placeholder='Ingrese password'
                                    className="form-control"
                                />
                            </div>

                            <div className='col-md' style={{ marginTop: '80px' }}>
                                <button className='btn btn-primary w-100' onClick={handlerLoginIn}>Login In</button>
                            </div>
                            <div className='col-md my-3 text-center'>
                                <a onClick={handlerGoToRegister}>Don't have an account yet? click here to register.</a>
                            </div>

                        </form>
                    </div>
                </div>
                <div className='col-lg-7 d-md-none d-lg-block d-flex justify-content-center align-items-center'>
                    <img
                        src="https://www.ceac.es/sites/default/files/2020-08/estudiar-online-ceac.jpg.webp"
                        alt="imgLogInEducation"
                        className='img-fluid'
                        style={{ height: "100vh", width: 'auto' }}
                    />
                </div>
            </div>
        </div>
    );
};
