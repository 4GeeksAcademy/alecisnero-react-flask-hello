import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

import { StartLogin } from '../component/StartLogin.jsx'

export const LoginIn = () => {
    const { store, actions } = useContext(Context)

    return (
        <div>
            <StartLogin />
        </div>
    )
}