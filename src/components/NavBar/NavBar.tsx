import AppBar from "@mui/material/AppBar";
import React from "react";
import {Grid, Toolbar, Typography} from "@mui/material";

export default function NavBar() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" align="center">
                                Advent of code
                            </Typography>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}
