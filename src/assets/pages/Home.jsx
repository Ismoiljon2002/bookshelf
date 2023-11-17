import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from '../components/Navbar';
import { Button, Box, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import BookCard from '../components/BookCard';
import AddBookModalComponent from '../components/AddBookModal';
import md5 from 'js-md5';

import { BASE_URL } from '../BASE_URL';

function Home() {

    const [books, setBooks] = useState([
        {
            id: 1,
            title: 'Book title',
            body: "Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque varius vestibulum magna in. Tortor quisque nisl congue ut tellus sem id.",
            name: "ismoiljon mirabdullaev",
            year: 2019,
            pages: 66,
        },
        {
            id: 2,
            title: 'Book title',
            body: "Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque varius vestibulum magna in. Tortor quisque nisl congue ut tellus sem id.",
            name: "ismoiljon mirabdullaev",
            year: 2005,
            pages: 54,
        },
        {
            id: 3,
            title: 'Book title',
            body: "Lorem ipsum dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet consectetur. Nulla adipiscing neque varius vestibulum magna in. Tortor quisque nisl congue ut tellus sem id.",
            name: "ismoiljon mirabdullaev",
            year: 2023,
            pages: 540,
        },
        {
            id: 4,
            title: 'Book title',
            body: "Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque varius vestibulum magna in. Tortor quisque nisl congue ut tellus sem id.",
            name: "ismoiljon mirabdullaev",
            year: 2023,
            pages: 400,
        },
    ]);
    const [addBook, setAddBook] = useState(false);
    // Your component code
    const currentUser = JSON.parse(localStorage.getItem('user'));

    const generateSignature = () => {
        const method = 'GET';
        const url = '/books';
        const body = '';
        const userSecret = currentUser?.password;

        // Concatenate components
        const concatenatedString = `${method}+${url}+${body}+${userSecret}`;

        // Calculate MD5 hash
        const md5Signature = md5(concatenatedString);
        return md5Signature;
    };


    useEffect(() => {

        axios.get({
            baseUrl: `${BASE_URL}/books`,
            headers: {
                Key: currentUser?.username,
                Sign: generateSignature(),
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    })
    return (
        <section id='home' className='home page '>

            <AddBookModalComponent show={addBook} setShow={setAddBook} />

            <ResponsiveAppBar />

            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1 }}>
                        <h2>You've got <span> 7 books </span></h2>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            variant='contained'
                            onClick={() => setAddBook(true)}
                        > + Create a book</Button>
                    </Box>
                </Toolbar>

                <Box className="cards">
                    {books?.map(book => <BookCard book={book} key={book} />)}
                </Box>

            </Container>
        </section>
    );
}

export default Home;