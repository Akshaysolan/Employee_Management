import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EditAdmin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/edit_admin', {
                name,
                email,
                password
            });

            console.log(response.data); // Assuming the response contains some feedback
            // Reset the form after successful submission
            setName('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error editing admin:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border" style={{ marginTop: '30px' }}>
                <h2 style={{ textAlign: 'center' }}>Edit Admin</h2>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary" >Admin Edit</button>
                        <Link className="btn btn-primary"  to='/dashboard'>Go Back To Dashboard</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default EditAdmin;
