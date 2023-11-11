import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FairValue from '../../components/FairValue/FairValue';
import GrowthRateTable from '../../components/GrowthRateTable/GrowthRateTable';
import StockInfo from '../../components/StockInfo/StockInfo';
import TextInput from '../../components/TextInput/TextInput';
import { setSymbol, setDiscountRate, setGrowthRate, setYears } from '../../features/inputs';

import './analysis.css';

function Analysis () {
    const dispatch = useDispatch();
    const { growthRate, discountRate, years } = useSelector((state) => state.inputs);
    const [showDetails, setShowDetails] = useState(false);
    const [inputSymbol, setInputSymbol] = useState('');

    function inputSymbolChange (event) {
        setInputSymbol(event.target.value);
    }

    function handleBlur () {
        if (inputSymbol !== '') {
            dispatch(setSymbol(inputSymbol.toUpperCase()));
            setShowDetails(true);
        } else {
            setShowDetails(false);
        }
    }

    function onFocus (event) {
        return event.target.select();
    }

    return (
        <Grid
            container
        >
            <Grid
                sx={{
                    flexDirection: 'column'
                }}
                className='analysis-grid'
            >
                <input
                    className='symbol-input'
                    placeholder='Symbol'
                    type="text"
                    value={inputSymbol.toUpperCase()}
                    onChange={inputSymbolChange}
                    onBlur={handleBlur}
                    onFocus={(event) => onFocus(event)}
                />

                {showDetails &&
                <>
                    <Grid>
                        <TextInput
                            label={'Growth Rate: '}
                            value={growthRate}
                            storeSetter={setGrowthRate}
                        />
                        <TextInput
                            label={'Discount Rate: '}
                            value={discountRate}
                            storeSetter={setDiscountRate}
                        />
                        <TextInput
                            label={'Years: '}
                            value={years}
                            storeSetter={setYears}
                        />
                    </Grid>
                    <StockInfo/>
                </>
                }
            </Grid>
            {showDetails &&
            <Grid
                style={{
                    display: 'flex'
                }}>
                <FairValue/>
                <GrowthRateTable/>
            </Grid>}
        </Grid>
    );
}

export default Analysis;
