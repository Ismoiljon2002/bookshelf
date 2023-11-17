import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';

import './styles/componentStyles.css';

const AddBookModalComponent = ({ show, setShow }) => {

    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        cover: '',
        published: '',
        pages: '',
    });
    const [errMessage, setErrMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
          ...bookData,
          [name]: value,
        });
      };
    const validate = () => {
        let isValid = true;

        if (bookData.author.trim() === '') {
            setErrMessage('Author is required!');
            isValid = false;
        } else setErrMessage('');
        
        if (bookData.title.trim() === '') {
            setErrMessage('Book title is required!');
            isValid = false;
        } else setErrMessage('');
        
        if (bookData.cover.trim() === '') {
            setErrMessage('Cover information is required!');
            isValid = false;
        } else setErrMessage('');
        
        if (bookData.published.trim() === '') {
            setErrMessage('Published year is required!');
            isValid = false;
        } else setErrMessage('');
        
        if (Number(bookData.pages) < 1) {
            setErrMessage('Number of pages must be greater than 0!');
            isValid = false;
        } else setErrMessage('')

        
        return isValid;
    }

    const generateSignature = () => {
        const method = 'POST';
        const url = '/books';
        const body = JSON.stringify();
        const userSecret = userDetails.password;

        // Concatenate components
        const concatenatedString = `${method}+${url}+${body}+${userSecret}`;

        // Calculate MD5 hash
        const md5Signature = md5(concatenatedString);

        return md5Signature;
    };

    const addBook = () => {
        
        if (validate()) {
            axios.put()
            
        }
        else console.log('no validation')
    }
    
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header>
                <Modal.Title>
                    Create a book
                </Modal.Title>
                <Button className='close-btn' onClick={() => setShow(false)}>
                    <XCircle size={20} />
                </Button>
            </Modal.Header>
            <Modal.Body>
                <p className='text-danger' style={{ display: errMessage ? 'block' : 'none' }} >* {errMessage}</p>
                
                <label>Title</label>
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    placeholder="Enter Your title" 
                    fullWidth 
                    name='title'
                    onChange={e => handleChange(e) } 
                />

                <label>Author</label>
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    placeholder="Enter Your author" 
                    name='author' 
                    fullWidth 
                    onChange={e => handleChange(e)} 
                />

                <label>Cover</label>
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    placeholder="Enter Your cover" 
                    fullWidth 
                    name='cover' 
                    onChange={e => handleChange(e)} 
                />

                <label>Published</label>
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    type='date' 
                    placeholder="Enter Your published" 
                    fullWidth 
                    name='published' 
                    onChange={e => handleChange(e)}
                />

                <label>Pages</label>
                <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    type='number' 
                    placeholder="Enter Your pages" 
                    fullWidth 
                    name='pages' 
                    onChange={e => handleChange(e)} 
                    InputProps={{ inputProps: { min: 1 } }}
                />

                <div className="btns">
                    <Button variant='outlined'  onClick={() => setShow(false)}>Close</Button>
                    <Button variant='contained' onClick={addBook}>Submit</Button>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default AddBookModalComponent