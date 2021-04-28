import axios from "axios"

export const getSignup = async (username, email, password, security) => {
    return await axios.post('http://localhost:8000/signup', { username, email, password, security })
}
export const CheckUsername = async (username) => {
    return await axios.get('http://localhost:8000/checkUsername', {
        headers: {
            username,
        }
    })
}
export const CheckEmail = async (email) => {
    return await axios.get('http://localhost:8000/checkEmail', {
        headers: {
            email,
        }
    })
}
export const getLogin = async (username, password) => {
    return await axios.get('http://localhost:8000/login', {
        headers: {
            username,
            password
        }
    })
}
export const getPassword = async (security, username) => {
    return await axios.get('http://localhost:8000/password', {
        headers: {
            security,
            username,
        }
    })
}
export const postProfile = async (username, Name, age, address, email, phone) => {
    return await axios.post('http://localhost:8000/profile', { username, Name, age, address, email, phone })
}
export const getProfile = async (username) => {
    return await axios.get('http://localhost:8000/select_profile', {
        headers: {
            username
        }
    })
}
