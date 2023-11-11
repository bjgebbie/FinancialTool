import { Grid, Typography } from '@mui/material';
import { React, useState } from 'react';
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

    return (
        <Grid>
            <Typography
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
            />
        </Grid>
    );
}

export default Input;
