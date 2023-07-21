import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import getDcfFairValue from '../myFinanceAPI/getDcfFairValue';

function FairValue(props) {
    const {symbol, growthRate, dr, n} = props;
    const [fairValue, setFairValue] = useState('0.000')

    function handleChange() {
        getDcfFairValue(symbol, growthRate, dr, n).then(
            (response) => {
                setFairValue(response)
            }
        )
        
    }

    return (
        <div>
            <Button onClick={handleChange} variant="success">Calculate</Button>{' '}
            <h1>Fair Value: ${fairValue}</h1>
        </div>
    )
}

export default FairValue