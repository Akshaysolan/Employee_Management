import React, { useState } from 'react';
import '../css/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted:", values);

        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    // Show consent notification
                    toast.info(
                        <div>
                            We would like to set a cookie to personalize your experience. Do you consent to this?
                            <div>
                                <button onClick={() => handleCookieConsent(result.data.username)} className='btn btn-success me-2 mt-2'>Yes</button>
                                <button onClick={() => handleCookieConsent(result.data.username)}className='btn btn-danger mt-2'>No</button>
                            </div>
                        </div>,
                        {
                            position: "top-center",
                            autoClose: false,
                            closeOnClick: false,
                            draggable: false,
                        }
                    );
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => {
                console.log("Error:", err);
            });
    }

    const handleCookieConsent = (username) => {
        Cookies.set('username', username, { expires: 7, path: '' });
        navigate('/dashboard');
        toast.dismiss(); 
    };

    const handleCookieDecline = () => {
        toast.dismiss(); 
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email"
                            name="email"
                            autoComplete='off'
                            placeholder='Enter Email'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                setValues({ ...values, email: e.target.value })
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password"
                            name="password"
                            autoComplete='off'
                            placeholder='Enter Password'
                            className='form-control rounded-0'
                            onChange={(e) => {
                                setValues({ ...values, password: e.target.value })
                            }}
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Login</button>
                    <div className='mb-3'>
                        <input type="checkbox" name="tick" id="tick" className='me-2' />
                        <label htmlFor="tick"><strong>You agree with Terms & Conditions</strong></label>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;
