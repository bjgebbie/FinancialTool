import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSymbol } from '../../features/inputs';
import './symbol-input.css';

function SymbolInput () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { symbol } = useSelector((state) => state.inputs);
    const [inputSymbol, setInputSymbol] = useState(symbol);

    function inputSymbolChange (event) {
        setInputSymbol(event.target.value);
    }

    function handleBlur () {
        if (inputSymbol !== '') {
            dispatch(setSymbol(inputSymbol.toUpperCase()));
            navigate('/Analysis');
        }
    }

    function onFocus (event) {
        return event.target.select();
    }

    return (
        <Grid>
            <input
                className='symbol-input'
                placeholder='Symbol'
                type="text"
                value={inputSymbol.toUpperCase()}
                onChange={inputSymbolChange}
                onBlur={handleBlur}
                onFocus={(event) => onFocus(event)}
            />
        </Grid>
    );
}

export default SymbolInput;
