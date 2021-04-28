import React, { useState } from 'react'
import "./signup.css"
import { getSignup, CheckUsername, CheckEmail } from "../functions/function"
import $ from "jquery"
import { useHistory } from "react-router-dom"
const formValues = {
    username: "",
    email: "",
    password: "",
    cp_password: "",
    security: "",
    usernameState: false,
    emailState: false,
    finalState: false,
    passState: false,
}
function Signup() {
    let history = useHistory();
    const [values, setValues] = useState(formValues);
    const { username, email, password, cp_password, security, usernameState, emailState, finalState, passState } = values;
    const handleSubmit = (e) => {
        e.preventDefault();
        getSignup(username, email, password, security)
            .then((resp) => {
                alert("User has been created Successfully :)");
                history.push("/login");
            })
            .catch(err => {
                alert("Invalid details provided please check all the details and make the border green")
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const checkUsernName = () => {
        let c = 0;
        CheckUsername(username)
            .then(resp => {
                console.log(resp.data);
                if (resp.data.length > 0) {
                    setValues({ ...values, usernameState: true })
                    $('.username').css('border', '1.5px solid red')
                    c = 1;
                }
            })
            .catch(err => {
                console.log(err)
            })
        if (usernameState && c == 0) {
            setValues({ ...values, usernameState: false })
            $('.username').css('border', '1.5px solid green')
        }

    }

    const checkEmail = () => {
        let c = 0;
        CheckEmail(email)
            .then(resp => {
                console.log(resp.data);
                if (resp.data.length > 0) {
                    setValues({ ...values, emailState: true })
                    $('.email').css('border', '1.5px solid red')
                    c = 1;
                }
            })
            .catch(err => {
                console.log(err)
            })
        if (emailState && c == 0) {
            setValues({ ...values, emailState: false })
            $('.email').css('border', '1.5px solid green')
        }

    }


    const checkPassword = () => {
        if (password === cp_password) {
            setValues({ ...values, passState: false })
            $('.pass').css('border', '1.5px solid green')
        } else {
            setValues({ ...values, passState: true })
            $('.pass').css('border', '1.5px solid red')
        }
    }

    const seePass = () => {
        const pass = document.querySelector('.pass')
        if (pass.type == "password") {
            $('.pass').attr('type', 'text');
            $('.eye1').attr('class', 'fas fa-eye-slash eye1')
        } else if (pass.type == "text") {
            $('.pass').attr('type', 'password');
            $('.eye1').attr('class', 'fas fa-eye eye1')
        }
    }

    return (
        <div className='signup_component'>
            <div className='overlay'></div>
            <img width="100%" height="690px" src='https://www.ionos.at/digitalguide/fileadmin/DigitalGuide/Teaser/deep-learning-vs-machine-learning-t.jpg' />
            <div className='form-holder'>
                <h2>Signup Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Enter your username"
                        name="username"
                        className='username'
                        pattern="[^0-9]+"
                        value={username}
                        onChange={handleChange}
                        onBlur={checkUsernName}
                        autoComplete="off"
                        autoFocus
                        title="username should contain only letters"
                        required
                    />
                    {usernameState && <span className='checkText'>Username is already taken!..</span>}
                    <input type="text"
                        placeholder="Enter your email"
                        className='email'
                        name="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={checkEmail}
                        title="please enter valid email address"
                        required
                    />
                    {emailState && <span className='checkText'>Email is already taken!..</span>}
                    <input type="password"
                        placeholder="Enter your password"
                        className='pass'
                        name="password"
                        value={password}
                        pattern=".{8,}"
                        title="Password should contain 8 or more characters"
                        onChange={handleChange}
                        className="pass"
                        required
                    />
                    <input type="password"
                        placeholder="Confirm your password"
                        name="cp_password"
                        value={cp_password}
                        pattern=".{8,}"
                        title="Password should matched with above"
                        onChange={handleChange}
                        onBlur={checkPassword}
                        className="pass"
                        required
                    />
                    <i class="fas fa-eye eye1" onClick={seePass}></i>
                    {passState && <span className='checkText'>password is not matched!..</span>}
                    <span>What is your first movie name that you visit on the theatre?</span>
                    <input type="text"
                        placeholder="Enter your security answer and remember it"
                        name="security"
                        value={security}
                        autoComplete="off"
                        onChange={handleChange}
                        className='security'
                        required
                    />
                    <button className='signup_but'>Sign Up</button>
                </form>
            </div>

        </div>
    )
}

export default Signup
