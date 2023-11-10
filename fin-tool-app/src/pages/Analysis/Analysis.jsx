import React, { useState } from 'react';
import FairValue from '../../components/FairValue/FairValue';
import GrowthRateTable from '../../components/GrowthRateTable/GrowthRateTable';
import Container from 'react-bootstrap/Container';
import StockInfo from '../../components/StockInfo/StockInfo';
import './analysis.css';

function Analysis () {
    const [symbol, setSymbol] = useState('');
    const [growthRate, setGrowthRate] = useState('0.10');
    const [dr, setDr] = useState('0.15');
    const [n, setN] = useState('10');
    const [selectedSymbol, setSelectedSymbol] = useState('0.00');
    const [selectedGr, setSelectedGr] = useState('0.00');
    const [selectedDr, setSelectedDr] = useState('0.00');
    const [selectedN, setSelectedN] = useState('0.00');

    const [showDetails, setShowDetails] = useState(false);

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
    function handleBlur () {
        if (symbol !== '') {
            setShowDetails(true);
            setSelectedSymbol(symbol);
        } else {
            setShowDetails(false);
        }
        setSelectedGr(growthRate);
        setSelectedDr(dr);
        setSelectedN(n);
    }

    return (
        <Container>
            <Container>
                {/* {showDetails &&
                <Top20Table
                    growthRate={growthRate}
                    dr={dr}
                    n={n}
                />
                } */}
            </Container>
            <Container>
                <Container>
                    <input
                        className='symbolInput'
                        placeholder='Symbol'
                        type="text"
                        value={symbol}
                        onChange={handleSymbolChange}
                        onBlur={handleBlur} />

                    {showDetails &&
                        <Container>
                            <Container>
                                <Container md>
                                    <p className='pStyles'>Growth Rate: <input className='inputsStyle' type="text" value={growthRate} onChange={handleGrowthRateChange} onBlur={handleBlur} /></p>
                                    <p className='pStyles'>Discount Rate: <input className='inputsStyle' type="text" value={dr} onChange={handleDrChange} onBlur={handleBlur} /></p>
                                    <p className='pStyles'>Time in Years: <input className='inputsStyle' type="text" value={n} onChange={handleNChange} onBlur={handleBlur} /></p>
                                </Container>
                            </Container>
                            <Container>
                                <FairValue symbol={selectedSymbol} growthRate={selectedGr} dr={selectedDr} n={selectedN} />
                            </Container>
                            <Container>
                                <Container>
                                    <StockInfo symbol={selectedSymbol} />
                                    <GrowthRateTable symbol={selectedSymbol} />
                                </Container>
                            </Container>
                        </Container>
                    }
                </Container>
            </Container>
        </Container>
    );
}

export default Analysis;
