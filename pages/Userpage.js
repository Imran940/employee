import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import Profile from './Profile';

function Userpage() {
    let history = useHistory();
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        if (user === null && !window.localStorage.getItem('username')) {
            history.push('/login')
        } else {
            history.push('/userpage')
        }
    }, [])
    return (
        <div>
            <Profile />
        </div>
    )
}

export default Userpage
