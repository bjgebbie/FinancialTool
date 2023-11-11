import { Grid, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './text-input.css';

function Input (props) {
    const { label, value, storeSetter } = props;
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(value);

    function onChange (event) {
        setInputValue(event.target.value);
    }

    function handleBlur () {
        if (inputValue !== '') { dispatch(storeSetter(inputValue)); }
    }

    function handleFocus (event) {
        const decmialIndex = inputValue.indexOf('.') + 1;
        return event.target.setSelectionRange(decmialIndex, inputValue.length);
    }

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    return (
        <Grid
            className='text-input-grid'
        >
            <Typography
                className='text-input-label'
                variant='p'
            >
                {label}
            </Typography>
            <input
                className='text-input'
                type="text"
                value={inputValue}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={(event) => handleFocus(event)}
            />
        </Grid>
    );
}

export default Input;
