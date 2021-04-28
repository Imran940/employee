import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import './Header.css'
function Header() {
    const { user } = useSelector(state => ({ ...state }))
    let dispatch = useDispatch();
    let history = useHistory()
    const signOut = () => {
        dispatch({
            type: "LOG_OUT",
            payload: null
        })
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        window.localStorage.removeItem('name');
        history.push('/login')
    }
    return (
        <>
            <div className='header'>
                <Link to="/" className='img_logo'>
                    <img className='logo' src='https://www.bamboohr.com/blog/wp-content/uploads/Employee_Development_Plans_4_Winning_Steps_to_Engage_Employees700x525.png' />
                </Link>
                <h2>Welcome To Employee Page</h2>
                {(user && user.username) ? <div className='avatar'><AccountCircleIcon onClick={signOut} className='userIcon' titleAccess='click here to signout' /> <h3>{user?.username}</h3></div>
                    : <div className='signIn_up'>
                        <Link to='login' className='login'><h3>Login</h3></Link>
                        <Link to='signup' className='signup'><h3>Sign Up</h3></Link>
                    </div>}
            </div>
        </>

    )
}

export default Header
