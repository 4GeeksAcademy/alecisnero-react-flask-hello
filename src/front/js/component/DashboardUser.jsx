import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../store/appContext'

import { FaCircleArrowLeft } from "react-icons/fa6";
import { BarraUser } from './BarraUser.jsx';

export const DashboardUser = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    function handleHome() {
        navigate('/')
    }

    
    return (
        <div>
            {/*BARRA DE USER*/}
            <BarraUser />


            <div className='row' style={{ height: '100vh' }}>
                <div className='col-3 border border-secondary text-center'>
                    <div className='text-center my-3 d-flex align-items-center justify-content-center'>
                        <div className='fs-4' onClick={handleHome}
                            style={{cursor: "pointer"}}><FaCircleArrowLeft /></div>
                        <div>
                            <h3 className='text-center d-inline mx-2'>Dashboard User</h3>
                        </div>

                    </div>

                    <div>
                        <div className='border-bottom w-100 mx-1 my-3 pb-3'><h5 className='fw-bolder'>Opciones</h5></div>
                        <div className='col-12 w-100'>
                            <button className='btn btn-secondary my-2 w-75'>Profile</button>
                        </div>
                        <div className='col-12 w-100'>
                            <button className='btn btn-secondary my-2 w-75' onClick={() => { actions.getUser() }}>Ver User</button>
                        </div>
                        <div className='col-12 w-100'>
                            <button className='btn btn-secondary my-2 w-75'>Cursos</button>
                        </div>
                    </div>
                </div>

                {/*AQUI IRA EL CONTENIDO*/}
                <div className='col border border-secondary'>
                    {
                        store.user.map((item, index) => {
                            return (
                                <div key={index} className='border border-secondary mx-5 my-2'>
                                    <p><span className='text-secondary'>Id:</span>{item.id} y <span className='text-secondary'>Correo:</span>{item.email}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
