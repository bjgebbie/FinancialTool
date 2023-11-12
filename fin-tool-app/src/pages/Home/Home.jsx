import { Grid } from '@mui/material';
import React from 'react';

import SymbolInput from '../../components/SymbolInput/SymbolInput';
import './home.css';

function Home () {
    return (
        <Grid
            container
            className='home-grid-container'
        >
            <SymbolInput/>
        </Grid>
    );
}

export default Home;
