import React, { useState } from 'react';
import FairValue from './FairValue';
import GrowthRateButton from './GrowthRateButton';
function DcfInput () {
    
    const [symbol, setSymbol] = useState('')
    const [growthRate, setGrowthRate] = useState('')
    const [dr, setDr] = useState('')
    const [n, setN] = useState('')

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
                
            </React.Fragment>
            <FairValue 
                symbol={symbol} 
                growthRate={growthRate} 
                dr={dr}
                n={n}
            />
            <GrowthRateButton symbol={symbol}/>

        </div>
    );
}

export default DcfInput