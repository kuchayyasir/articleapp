import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CssBaseline,
    Grid,
    //StarIcon,
    Toolbar,
    Typography,
    Link,
    GlobalStyles,
    Container,
} from "@mui/material";
import user from "../../Models/user";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
function DashboardContent() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();

        window.axios
            .post("/api/logout")
            .then(() => {
                //successful response
            })
            .catch(() => {
                //handle if something went wrong
            })
            .then(() => {
                //this code will be definitely executed
                user.logout(afterUserDestroyed);
            });
    };
    const afterUserDestroyed = () => {
        navigate("/app/login");
    };
    const fetchArticles = () => {
        window.axios
            .get("/api/articles")
            .then((response) => {
                console.log(response);
                //successful response
                setArticles(response.data);
            })
            .catch(() => {
                //handle if something went wrong
            });
    };
    useEffect(() => {
        fetchArticles();
    }, []);
    return (
        <React.Fragment>
            <GlobalStyles
                styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
            />
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{
                    borderBottom: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                }}
            >
                <Toolbar sx={{ flexWrap: "wrap" }}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Articles
                    </Typography>

                    <div>
                        <Typography variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                            {localStorage.getItem("userEmail")}
                        </Typography>
                    </div>
                    <div>
                        <Button
                            onClick={logout}
                            variant="outlined"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{ pt: 8, pb: 6 }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Articles
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    <Button
                        onClick={() => navigate("/app/article")}
                        fullWidth
                        variant="outlined"
                    >
                        Add new article
                    </Button>
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="lg" component="main">
                <Grid container spacing={2} alignItems="flex-end">
                    {articles.map((article) => (
                        <Grid item key={article.id} xs={12} sm={4} md={4}>
                            <Card
                            >
                                <CardHeader
                                    title={article.title}
                                    subheader={article.subheader}
                                    titleTypographyProps={{ align: "center" }}
                                    subheaderTypographyProps={{
                                        align: "center",
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            height:"100",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            component="p"
                                            variant="subtitle1"
                                            align="center"
                                        >
                                            {article.body}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={"outlined"}>
                                        {"View"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
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
                <Grid
                    container
                    spacing={4}
                    justifyContent="space-evenly"
                ></Grid>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}
