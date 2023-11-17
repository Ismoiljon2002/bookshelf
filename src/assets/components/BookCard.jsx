import { Box, Card, CardContent, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function BookCard({ book }) {
    const { title, body, name, year, pages } = book;
    

    return (<>
        <Card>
            <CardContent>

                <h3>{title}</h3>
                <Typography>{body}</Typography>

                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography>{name}: {year}-year</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Typography className='pages'>{pages} pages</Typography>
                    </Box>
                </Toolbar>
            </CardContent>
        </Card>
    </>);
}

export default BookCard;