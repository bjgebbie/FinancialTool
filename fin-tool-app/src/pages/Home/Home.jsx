import { Grid, Typography } from '@mui/material';
import React from 'react';

import './home.css';

function Home () {
    return (
        <Grid
            container
            className='home-grid-container'
        >
            <Typography
                variant='h3'
            >
                {'Welcome!'}
            </Typography>
        </Grid>
    );
}

export default Home;
