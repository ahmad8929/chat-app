import React from 'react';
import Navbar from '../Templet/Navbar';
import Footer from '../Templet/Footer';
import Background from '../../image/home1.png';
import './Home.css'; 

function YourComponentName() {
    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <div className="text">
                    <h1>Welcome to Group Chat!</h1>
                    <p>
                        "Welcome to our immersive real-time group chat platform! Discover a
                        vibrant and dynamic community where connecting with like-minded
                        individuals has never been easier. Our platform offers a seamless
                        and secure environment for group conversations, fostering meaningful
                        discussions, and creating lasting connections. Whether you're looking
                        to engage in lively debates, share your interests, or simply have
                        fun, our group chat feature allows you to join chat rooms. Dive into
                        the world of limitless possibilities and become a part of our growing
                        chat community today!"
                    </p>
                </div>
                <img className="image" src={Background} alt="Background" />
            </div>
            <Footer />
        </div>
    );
}

export default YourComponentName;
