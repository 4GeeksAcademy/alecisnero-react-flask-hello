import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { Message } from './Message.jsx'
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaLessThanEqual } from 'react-icons/fa';

export const StartLogin = () => {
    const { store, actions } = useContext(Context)
    const [active, setActive] = useState(false)
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

    async function handlerLoginIn(e) {
        e.preventDefault();
        if (formLoginIn.email !== '' && formLoginIn.password !== '') {
            await actions.loginIn(formLoginIn);
            if (localStorage.getItem('jwt-token')) {
                message()
            }
        }
    }

    function handlerHome() {
        navigate('/')
    }

    function handlerGoToRegister() {
        navigate('/Registerlogin')
    }

    const [counter, setCounter] = useState(7)

    function message() {
        setCounter(0)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter + 1 === 7) {
                    navigate('/Dashboard')
                    clearInterval(interval)
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval)
    }, [navigate])

    const msgError = typeof store.error === 'string' ? store.error : JSON.stringify(store.error);
    const msg = typeof store.msg === 'string' ? store.msg : JSON.stringify(store.msg);



    return (
        <div className=' position-relative'>
            {/* Mostrar mensaje de éxito o error */}
            {msgError && <Message type="danger" text={msgError} />}
            {msg && <Message type="success" text={msg} />}

            {/* <div className=' d-flex justify-content-center position-absolute top-00 start-50 translate-middle-x'>
                <div className={`text-center w-100 ${(counter >= 1 && counter <= 3) ? "alert alert-info" : "d-none"}`} >
                    { store.message || "Loading message..." }
                </div>
                
            </div> */}

            <div className='row d-flex flex-row'>
                <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                    <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{ cursor: "pointer" }}>
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
