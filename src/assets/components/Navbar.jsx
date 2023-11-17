import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, FormControl, Input, Container, Avatar, Tooltip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import logo from '../img/logo.png';

function ResponsiveAppBar() {

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={logo} alt="Logo" className='logo' />

                    <Box sx={{ flexGrow: 1 }}>
                        <FormControl style={{color: '#fff'}}>
                            <Input placeholder='Search for any training you want'
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <SearchIcon style={{color: '#fff'}} />
                                }
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="user name" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
