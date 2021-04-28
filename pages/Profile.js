import React, { useEffect, useState } from 'react'
import { postProfile, getProfile } from '../functions/function';
import { useSelector } from "react-redux"
import "./Profile.css"
const profile_initial = {
    Name: "",
    email: "",
    age: "",
    address: "",
    phone: ""
}
function Profile() {
    const { user } = useSelector((state) => ({ ...state }))
    const [profile, setProfile] = useState([]);
    const [profile_select, setProfile_select] = useState(false)
    const [profile_values, setProfile_values] = useState(profile_initial)
    const { Name, email, age, address, phone } = profile_values;
    const username = window.localStorage.getItem('username');
    useEffect(() => {
        getProfile(username, Name, age, address, email, phone)
            .then(resp => {
                console.log(resp.data)
                setProfile(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
        setProfile_values({ ...profile_values, email: user?.email })
    }, [profile_select])

    const handleSubmit = (e) => {
        e.preventDefault();
        postProfile(username, Name, age, address, email, phone)
            .then(resp => {
                console.log(resp.data)
                setProfile_select(true)
            })
            .catch(err => {
                console.log(err)
                alert(err?.response?.data)
            })
    }
    const handleChange = (e) => {
        setProfile_values({ ...profile_values, [e.target.name]: e.target.value })
    }
    return (
        <>

            <div className="my_profile_div">
                <img src="https://www.vhv.rs/dpng/d/546-5468324_fill-form-icon-png-transparent-png.png" className="my_profile_div_img" alt="img" />
                <div className='my_profile_div_inner'>
                    <form onSubmit={handleSubmit} className='my_profile_div_form'>
                        <input type='text' value={Name} onChange={handleChange} className="flname" value={Name} placeholder="Enter your name" name='Name' pattern="[^0-9]+" required />
                        <input type='text' value={email} onChange={handleChange} className="emal" placeholder="Enter your email" name='email' pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
                        <input type='text' value={address} onChange={handleChange} required name='address' className="sid" placeholder="Please Enter Your Address" autocomplete="off" title='please enter valid address' pattern="[A-Z a-z]{1,20}" required />
                        <input type='text' value={age} onChange={handleChange} required name='age' className="sage" placeholder="Please Enter Your Age" autocomplete="off" title='please enter Age' pattern="[0-9]{2}" required />
                        <input type='text' value={phone} onChange={handleChange} required name='phone' className="sph" placeholder="Please Enter Your Phone Number" autocomplete="off" title='please enter valid phone number' pattern="[0-9]{10}" required />
                        <button className='upd'>Create</button><br /><br />
                        {profile_select && <span className="success">Profile Created Successfully!..</span>}
                    </form>
                </div>
            </div>
            {/* profile card */}

            <div className="wrapper1">
                <div className="left">
                    <i class="fas fa-id-card profile_icon"></i>
                    <h4>My Profile</h4>
                    <h2 className='name'>{profile[0]?.Name}</h2>
                </div>
                <div className="right">
                    <div className="info">
                        <h3>Information</h3>
                        <div className="info_data">
                            <div className="data">
                                <h4>age</h4>
                                <p>{profile[0]?.age}</p>
                            </div>
                            <div className="data">
                                <h4>Address</h4>
                                <p>{profile[0]?.address}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="contacts">
                        <h3> Contact Details </h3>
                        <div className="contacts_data">
                            <div className="data">
                                <h4>Email</h4>
                                <p>{profile[0]?.email}</p>
                            </div>
                            <div className="data">
                                <h4>Phone</h4>
                                <p>{profile[0]?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default Profile
