import React, { useState } from 'react';
import '../css/style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                //console.log("Response:", result); 

                if(result.data.loginStatus){
                   navigate('/dashboard') 
                }
                else{
                   setError(result.data.Error)
                }
               
            })
            .catch(err => {
                console.log("Error:", err); 
            });
    }

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
        </div>
    )
}

export default Login;
