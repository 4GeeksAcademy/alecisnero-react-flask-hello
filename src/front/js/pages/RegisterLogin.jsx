import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'

/**Components */
import { AddLogin } from '../component/AddLogin.jsx'

export const RegisterLogin = () => {
    const { store, actions } = useContext(Context)

    return (
        <div>
            <AddLogin />
        </div>
    )
}