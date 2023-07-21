import React, { useState } from 'react';
import axios from 'axios';

function DcfInput () {
    
    const [symbol, setSymbol] = useState('')
    const [growthRate, setGrowthRate] = useState('')
    const [dr, setDr] = useState('')
    const [n, setN] = useState('')
    const [fairValue, setFairValue] = useState('0.000')
    

    async function getFairValue () {
        const url = `http://127.0.0.1:5000/Dcf`;
        let response = await axios.get(
            url,
            {
                params: {
                    symbol: symbol,
                    growthRate: growthRate,
                    dr: dr,
                    n: n
                }
            }
        )
        setFairValue(response.data.toString());       
    }

    function handleSymbolChange (event) {
        setSymbol(event.target.value);
    }
    function handleGrowthRateChange (event) {
        setGrowthRate(event.target.value);
    }
    function handleDrChange (event) {
        setDr(event.target.value);
    }
    function handleNChange (event) {
        setN(event.target.value);
    }

    return (
        <div>
            <React.Fragment>
                <p>Symbol: <input type="text" value={symbol} onChange={handleSymbolChange} /></p>
                <p>Growth Rate: <input type="text" value={growthRate} onChange={handleGrowthRateChange} /></p>
                <p>Discount Rate: <input type="text" value={dr} onChange={handleDrChange} /></p>
                <p>How many years: <input type="text" value={n} onChange={handleNChange} /></p>
                <button onClick={getFairValue}>Calculate</button> 
                <h1>Fair Value: ${fairValue}</h1>
            </React.Fragment>

        </div>
    );
}

export default DcfInput