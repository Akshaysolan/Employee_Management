import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';  

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);  
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', { email, password })
            .then((result) => {
                if (result.data.Status) {
                    localStorage.setItem('token', result.data.Token); 
                    navigate('/dashboard');
                } else {
                    setError(result.data.Error); 
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
            <div className="p-3 rounded w-25 border loginForm">
                <div className="text-danger">
                    {error && error}
                </div>
                <h3 className="text-center">Employee Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="mb-3 mt-2">
                        <input type="checkbox" name="tick" id="tick" className="me-2" />
                        <label htmlFor="tick"><strong>You agree with Terms & Conditions</strong></label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
