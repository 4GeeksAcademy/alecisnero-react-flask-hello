import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'

import { FaCircleArrowLeft } from "react-icons/fa6";

export const AddLogin = () => {
    const { store, actions } = useContext(Context)
    const [formLogin, setFormLogin] = useState(
        {
            email: '',
            password: '',
            username: '',
            fullname: '',
        })

    const navigate = useNavigate()

    /*Funcion para pasar lo valores del form */
    function handlerChangeLogin(event) {
        event.preventDefault()
        const { name, value } = event.target

        setFormLogin(prev => ({
            ...prev,
            [name]: value
        }))
    }

    /**Funcion para limitar form */
    function handlerAddLoginUser(eve) {
        eve.preventDefault()
        if (
            formLogin.email !== '' &&
            formLogin.password !== '' &&
            formLogin.username !== '' &&
            formLogin.name !== ''
        ) {
            actions.createUser(formLogin)
        } else {
            alert('No deje dejar campo vacios')
        }

        /**console.log(formLogin)**/
    }

    function handlerHome() {
        navigate('/')
    }

    return (
        <div>

            <div>
                <form className=" container mx-auto mt-5 row g-3 needs-validation" onSubmit={handlerAddLoginUser} >
                    <div className="d-flex justify-content-center align-items-center">
                        <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{cursor: "pointer"}}>
                            <FaCircleArrowLeft />
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h1>Register User</h1>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <input type="text"
                            className="form-control" aria-describedby="inputGroupPrepend"
                            name='email'
                            value={formLogin.email}
                            onChange={handlerChangeLogin}
                            placeholder='email' required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Password</label>
                        <input
                            className="form-control" aria-describedby="inputGroupPrepend" name='password'
                            value={formLogin.password}
                            onChange={handlerChangeLogin}
                            type='password'
                            placeholder='password'
                            required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="col-md-2">
                        <label className="form-label">Username</label>
                        <div className="input-group has-validation">
                            <input
                                className="form-control" aria-describedby="inputGroupPrepend" name='username'
                                value={formLogin.username}
                                onChange={handlerChangeLogin}
                                type='text'
                                placeholder='username'
                                required />
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 position-relative">
                        <label className="form-label">Number Document</label>
                        <input
                            className="form-control" id="validationTooltip03"
                            name='fullname'
                            value={formLogin.name}
                            onChange={handlerChangeLogin}
                            type='text'
                            placeholder='fullname'
                            required />

                    </div>

                    <button className="btn btn-primary" onClick={handlerAddLoginUser}>
                        Create User
                    </button>
                </form>
            </div>
        </div>
    )
}