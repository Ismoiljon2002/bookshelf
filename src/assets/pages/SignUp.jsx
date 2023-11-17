import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { AlertComponent } from '../components/AlertComponent';

import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

import './styles/pages.css'

function SignUpPage() {
    const navigate = useNavigate();

    const [errMessage, setErrMessage] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const [alert, setAlert] = useState({
        alertType: "",
        alertMessage: '',
    })

    const [userDetails, setUserDetails] = useState({
        name: '',
        password: '',
        username: '',
        email: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };
    const validate = () => {
        let isValid = true;

        // validate name
        if (userDetails.name.trim() === '') {
            setErrMessage('Name is required!');
            isValid = false;
        } else setErrMessage('');

        // validate username (key)
        if (userDetails.username.trim() === '') {
            setErrMessage('Username is required!');
            isValid = false;
            if (userDetails.username.split(' ').length > 1) {
                setErrMessage("Username must be one word only!");
                isValid = false;
            }
        } else setErrMessage('');

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userDetails.email.match(emailRegex)) {
            setErrMessage('Invalid email address');
            isValid = false;
        }

        // validate password
        if (userDetails.password.length < 8) {
            setErrMessage('Password must be at least 8 characters long');
            isValid = false;
        }

        return isValid;

    }

    const submitForm = () => {
        if (validate()) {
            console.log(userDetails)
            const { email, username, password, name } = userDetails;
            axios.post(`${BASE_URL}/signup`,
                {
                    "name": name,
                    "email": email,
                    "key": username,
                    "secret": password
                }
            ).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data.data))

                    setAlert({ 
                        alertMessage: "Successfully created an account!",
                        alertType: "success"
                    });
                    
                    setShowAlert(true);

                    setTimeout(() => {
                        setShowAlert(false);
                        navigate("/");
                    }, 1000);
                };

            }).catch(err => {
                setAlert({ 
                    alertMessage: err.message,
                    alertType: "danger" 
                });

                setShowAlert(true);
                setTimeout(() => { setShowAlert(false); }, 3000);
                console.log(err)
            })


        } else console.log('no validation')
    }

    return (
        <section id='signUpPage' className='signUp page d-flex flex-row justify-content-center align-items-center'>
            <Card>
                <CardContent>
                    <h2>Sign up</h2>

                    <hr />

                    <form>
                        <p className="text-danger text-bold" style={{ display: errMessage ? "block" : 'none' }} > *{errMessage}</p>
                        <label>Your name</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Enter Your name"
                            name='name'
                            fullWidth
                            onChange={e => handleChange(e)}
                        />

                        <label>Your Username</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Enter Your Username"
                            name='username'
                            fullWidth
                            onChange={e => handleChange(e)}
                        />

                        <label>Your email</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type='email'
                            placeholder="Enter Your email"
                            name='email'
                            fullWidth
                            onChange={e => handleChange(e)}
                        />

                        <label>Your password</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            type='password'
                            placeholder="Enter Your username"
                            name='password'
                            fullWidth
                            onChange={e => handleChange(e)}
                        />

                        <Button variant='contained' fullWidth onClick={submitForm}>Submit</Button>

                        <p>Already signed up? <Link to="/sign-in">Sign in here </Link> </p>
                    </form>
                </CardContent>

                <AlertComponent style={{ position: "fixed" }} message={alert.alertMessage} variant={alert.alertType} show={showAlert} />

            </Card>


        </section>
    );
}

export default SignUpPage;