/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signin.css";
import { UserContext } from './UserContext';

const Signin = ({ setIsAuthenticated }) => {
    const [res, setRes] = useState();
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const {setUsername}=useContext(UserContext);

    const post_data = () => {
        PostEx();
    };
    const PostEx = async () => {
        try {
            const usernameValue = username.current.value;
            const passwordValue = password.current.value;

        const response = await axios.post(`http://localhost:9000/signin?username=${usernameValue}&password=${passwordValue}`);

        const { data } = response;
        setRes(data);
        if (response.status === 200) {
            setIsAuthenticated(true);
            setUsername(usernameValue);
            navigate("/home");
        }
    } catch (error) {
            console.error('Error during sign-in:', error);
            setRes("Invalid Username & Password");
        }
    };

    return (
        <React.Fragment>
            <div className="login-container">
                <div className="login-interior">
                    <div className="signin-content">
                        <h1>Sign In</h1>
                        <p className='result'>{JSON.stringify(res)}</p>
                        <input type="text" ref={username} placeholder='Username' autoFocus />
                        <br />
                        <input type="password" ref={password} placeholder='Password' />
                        <p>Already have an account?</p>
                        <button onClick={post_data}>SIGN IN</button>
                    </div>
                    <div className="signup-content">
                        <h1>Hello...!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <Link to="/signup"><button>SIGN UP</button></Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin;