

import React from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    TextField,
    CssBaseline,
    Grid,
    //StarIcon,
    Toolbar,
    Typography,
    Link,
    GlobalStyles,
} from '@mui/material';
import user from "../../Models/user";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function ArticleContent() {
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault()
    
        window.axios.post('/api/logout')
            .then(() => {
                //successful response
            })
            .catch(() => {
                //handle if something went wrong
            })
            .then(() => {
                //this code will be definitely executed
                user.logout(afterUserDestroyed)
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const article = {
            title: formData.get('title'),
            body: formData.get('body')
        } 

        window.axios.post('/api/articles', article).then((response) => {
            console.log(response)
            navigate('/app/dashboard', { replace: true })
        })
    }
    const afterUserDestroyed = () => {
       
        navigate('/app/login')
    }
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Articles
                    </Typography>
                    
                    <div>
                    <Typography variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        {localStorage.getItem('userEmail')}
                    </Typography>
                    </div>
                    <div>
                    <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Logout
                    </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Articles
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                <Button  onClick={()=>navigate('/app/dashboard')}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        Back
                                    </Button>
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="lg" component="main">
                <Grid container spacing={2} alignItems="center">
                <Container maxWidth={"lg"}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Box component={"form"} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        autoComplete="title"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="body"
                        label="Body"
                        type="textarea"
                        rows={6}
                        id="body"
                        autoComplete="body"
                    />
                    <Button
                        fullWidth
                        variant={"outlined"}
                        type={"submit"}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Container>
                </Grid>
            </Container>
            {/* Footer */}
            <Container
                maxWidth="md"
                component="footer"
                sx={{
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                    mt: 8,
                    py: [3, 6],
                }}
            >
                <Grid container spacing={4} justifyContent="space-evenly">
                </Grid>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Article() {
    return <ArticleContent />;
}
