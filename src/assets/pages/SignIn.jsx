import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { AlertComponent } from '../components/AlertComponent';
import md5 from 'js-md5';

import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

import './styles/pages.css'

function SignInPage() {

    const navigate = useNavigate();

    const [errMessage, setErrMessage] = useState();
    const [showAlert, setShowAlert] = useState(false);

    const [alert, setAlert] = useState({
        alertType: "",
        alertMessage: '',
    })

    const [userDetails, setUserDetails] = useState({
        password: '',
        username: '',
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

        // validate username (key)
        if (userDetails.username.trim() === '') {
            setErrMessage('Username is required!');
            isValid = false;
            if (userDetails.username.split(' ').length > 1) {
                setErrMessage("Username must be one word only!");
                isValid = false;
            }
        } else setErrMessage('');

        // validate password
        if (userDetails.password.length < 8) {
            setErrMessage('Password must be at least 8 characters long');
            isValid = false;
        }

        return isValid;

    }

    const generateSignature = () => {
        const method = 'GET';
        const url = '/myself';
        const body = '';
        const userSecret = userDetails.password;

        // Concatenate components
        const concatenatedString = `${method}+${url}+${body}+${userSecret}`;

        // Calculate MD5 hash
        const md5Signature = md5(concatenatedString);

        return md5Signature;
    };

    const submitForm = () => {
        if (validate()) {
            axios.get({
                baseUrl: `${BASE_URL}/myself`,
                headers: {
                    Key: userDetails.username,
                    Sign: generateSignature(),
                }
            }).then(res => {
                if (res.status === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data.data))

                    navigate("/");
                };
            
            }).catch(err => {
                setAlert({
                    alertMessage: err.message,
                    alertType: "danger",
                });
                setShowAlert(true);
                setTimeout(() => {setShowAlert(false);}, 3000);
                console.log(err)
            })


        } else console.log('no validation')
    }

    return (
        <section id='signInPage' className='signIn page d-flex flex-row justify-content-center align-items-center'>
            <Card>
                <CardContent>
                    <h2>Sign in</h2>

                    <hr />

                    <form>
                        
                        <p className="text-danger text-bold" style={{ display: errMessage ? 'block' : 'none' }} > *{errMessage}</p>
                       
                        <label>Your Username</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Enter Your Username"
                            name='username'
                            fullWidth
                            onChange={e => handleChange(e)}
                        />

                        <label>Your password</label>
                        <TextField 
                            id="outlined-basic" 
                            variant="outlined" 
                            type='password' 
                            placeholder="Enter Your username" 
                            fullWidth
                            name='password'
                            onChange={e => handleChange(e)}
                        />

                        <Button variant='contained' fullWidth onClick={submitForm}>Submit</Button>

                        <p>Don't have an account? <Link to="/sign-up"> Sign up here </Link> </p>
                    </form>

                    <AlertComponent style={{position: "fixed"}} message={alert.alertMessage} variant={alert.alertType} show={showAlert} />

                </CardContent>
            </Card>



        </section>
    );
}

export default SignInPage;