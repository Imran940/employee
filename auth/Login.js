import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import "./Login.css"
import $ from "jquery"
import { getLogin, getPassword } from '../functions/function';
function Login() {
    let dispatch = useDispatch();
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [security, setSecurity] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        getLogin(username, password)
            .then(resp => {
                dispatch({
                    type: "LOG_IN",
                    payload: {
                        username: resp.data[0].username,
                        password: resp.data[0].password,
                        email: resp.data[0].email,
                    }
                })
                history.push('/userpage')
            })
            .catch(err => {
                console.log(err);
                alert(err?.response?.data)
            })

    }

    const seePass = () => {
        const pass = document.querySelector('.pass')
        if (pass.type == "password") {
            $('.pass').attr('type', 'text');
            $('.eye').attr('class', 'fas fa-eye-slash eye')
        } else if (pass.type == "text") {
            $('.pass').attr('type', 'password');
            $('.eye').attr('class', 'fas fa-eye eye')
        }
    }

    const eyehide = () => {
        const pass = document.querySelector('.pass')
        if (pass.value === "") {
            $('.eye').css('display', 'none')
        }
        else {
            $('.eye').css('display', 'block')
        }
    }


    const forget_submit = (e) => {
        e.preventDefault()
        getPassword(security, username)
            .then(resp => {
                setPassword(resp.data[0].password)
                $('.forget_box').css('display', 'none');
                $('.eye').css('display', 'block')
            })
            .catch(err => {
                alert(err?.response.data)
            })
    }
    return (
        <div className='Login'>
            <div className='overlay'></div>
            <img width="100%" height="690px" src='https://www.ionos.at/digitalguide/fileadmin/DigitalGuide/Teaser/deep-learning-vs-machine-learning-t.jpg' />
            <div className='login_form'>
                <h2 className='login_form_head'>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Enter your username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        autoFocus
                        required
                    />
                    <input type="password"
                        placeholder="Enter your password"
                        onChange={e => {
                            setPassword(e.target.value)
                            eyehide()
                        }}
                        className='pass'
                        value={password}
                        required
                    />
                    <i class="fas fa-eye eye" onClick={seePass}></i>
                    <button>Login</button>
                </form>
                <span onClick={() => $('.forget_box').toggle()}
                    className='forget_pass'>Forget Password</span>

                <div className='forget_box'>
                    <form onSubmit={forget_submit}>
                        <input type="text"
                            placeholder="Enter your security answer"
                            autoFocus
                            autoComplete="off"
                            onChange={e => setSecurity(e.target.value)}
                            value={security}
                            required
                        />
                        <input type="text"
                            placeholder="Enter your username"
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="off"
                            value={username}
                            required
                        />
                        <button className='get_pass_but'>Get Password</button>
                    </form>
                </div>




            </div>





        </div >
    )
}

export default Login
