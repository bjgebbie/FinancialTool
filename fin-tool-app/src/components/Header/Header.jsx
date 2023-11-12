import { Grid } from '@mui/material';
import React from 'react';

import SymbolInput from '../SymbolInput/SymbolInput';
import './header.css';

function Header () {
    return (
        <Grid
            className='header-grid-container'
            container
        >
            <SymbolInput/>
        </Grid>
    );
}

export default Header;
