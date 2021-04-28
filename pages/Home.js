import React, { useState, useEffect } from 'react';
import "./Home.css";
import $ from "jquery";
import { useSelector } from "react-redux"
import { getLearnersList } from "../functions/function"
import { useHistory } from "react-router-dom"

function Home() {

    //sliding code
    let i = 0;
    const images = ['https://devrylaw.ca/wp-content/uploads/2020/05/Employer-and-Employee-FAQs.jpg',
        'https://assets.entrepreneur.com/content/3x2/2000/20180303115028-shutterstock-462214327.jpeg?width=700&crop=2:1',
        'https://associationsnow.com/wp-content/uploads/2020/07/GettyImages-1191877809-600x360.jpg',
        'https://www.zoomshift.com/blog/wp-content/uploads/2019/06/Employee-Appreciation.jpeg']
    function slide() {
        if (i === images.length) {
            i = 0;
        }
        $('.slide').attr('src', images[i])
        i++;
        setTimeout(slide, 3000)
    }
    slide();

    return (
        <div className='home'>
            <img className='slide' src='https://miro.medium.com/max/1400/1*YIZJpFXfbJsULbdr6b54sg.jpeg' />
            <div className='slide_overlay'></div>

        </div>
    )
}

export default Home
