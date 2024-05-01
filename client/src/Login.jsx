import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8086/login', { email, password })
            .then(
                result => {
                    console.log(result)
                    if(result.data.message === "Success") {
                        navigate('/home')
                    } else {
                        setErrorMessage(result.data.message)
                    }         
                }
            )
            .catch(err => console.log(err))
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter email address'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                    {errorMessage && <span className='text-danger'>{errorMessage}</span>}
                </form>

                <p>Don't have an account. Register</p>
                <Link to='/register' className='btn btn-default border w-100 bg-dark text-decoration none rounded-0'>
                    <span className='text-white'>Register</span>
                </Link>

            </div>
        </div>
    )
}

export default Login;