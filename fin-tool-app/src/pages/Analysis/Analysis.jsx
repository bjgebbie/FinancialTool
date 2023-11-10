import React, { useState } from 'react';
import FairValue from '../../components/FairValue/FairValue';
import GrowthRateTable from '../../components/GrowthRateTable/GrowthRateTable';
import Container from 'react-bootstrap/Container';
import StockInfo from '../../components/StockInfo/StockInfo';
import { setDiscountRate, setGrowthRate, setYears } from '../../features/inputs';
import { useSelector, useDispatch } from 'react-redux';
import './analysis.css';

function Analysis () {
    const [symbol, setSymbol] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('0.00');
    const [selectedGrowthRate, setSelectedGrowthRate] = useState('0.00');
    const [selectedDiscountRate, setSelectedDicountRate] = useState('0.00');
    const [selectedYears, setSelectedYears] = useState('0.00');
    const [showDetails, setShowDetails] = useState(false);

    const { growthRate, discountRate, years } = useSelector((state) => state.inputs);
    const dispatch = useDispatch();

    function handleSymbolChange (event) {
        setSymbol(event.target.value);
    }
    function handleGrowthRateChange (event) {
        dispatch(setGrowthRate(event.target.value));
    }
    function handleDiscountRateChange (event) {
        dispatch(setDiscountRate(event.target.value));
    }

    function handleYearsChange (event) {
        dispatch(setYears(event.target.value));
    }
    function handleBlur () {
        if (symbol !== '') {
            setShowDetails(true);
            setSelectedSymbol(symbol);
        } else {
            setShowDetails(false);
        }
        setSelectedGrowthRate(growthRate);
        setSelectedDicountRate(discountRate);
        setSelectedYears(years);
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
                                <p className='pStyles'>
                                    Growth Rate: <input className='inputsStyle' type="text" value={growthRate} onChange={handleGrowthRateChange} onBlur={handleBlur} />
                                </p>
                                <p className='pStyles'>
                                    Discount Rate: <input className='inputsStyle' type="text" value={discountRate} onChange={handleDiscountRateChange} onBlur={handleBlur} />
                                </p>
                                <p className='pStyles'>
                                    Time in Years: <input className='inputsStyle' type="text" value={years} onChange={handleYearsChange} onBlur={handleBlur} />
                                </p>
                            </Container>
                            <FairValue symbol={selectedSymbol} growthRate={selectedGrowthRate} dr={selectedDiscountRate} n={selectedYears} />
                            <StockInfo symbol={selectedSymbol} />
                            <GrowthRateTable symbol={selectedSymbol} />
                        </Container>
                }
            </Container>
        </Container>
    );
}

export default Analysis;
