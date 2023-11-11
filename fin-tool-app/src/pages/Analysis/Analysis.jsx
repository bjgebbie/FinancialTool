import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FairValue from '../../components/FairValue/FairValue';
import GrowthRateTable from '../../components/GrowthRateTable/GrowthRateTable';
import StockInfo from '../../components/StockInfo/StockInfo';
import TextInput from '../../components/TextInput/TextInput';
import { setSymbol, setDiscountRate, setGrowthRate, setYears } from '../../store/inputs';

import './analysis.css';

function Analysis () {
    const dispatch = useDispatch();
    const { symbol, growthRate, discountRate, years } = useSelector((state) => state.inputs);
    const [showDetails, setShowDetails] = useState(false);
    const [inputSymbol, setInputSymbol] = useState(symbol);

    function inputSymbolChange (event) {
        setInputSymbol(event.target.value);
    }

    function handleBlur () {
        dispatch(setSymbol(inputSymbol));
        if (inputSymbol !== '') {
            setShowDetails(true);
        } else {
            setShowDetails(false);
        }
    }

    return (
        <Grid>
            <Grid>
                {/* {showDetails &&
                <Top20Table
                    growthRate={growthRate}
                    dr={dr}
                    n={n}
                />
                } */}
            </Grid>
            <Grid>
                <input
                    className='symbolInput'
                    placeholder='Symbol'
                    type="text"
                    value={inputSymbol}
                    onChange={inputSymbolChange}
                    onBlur={handleBlur} />

                {showDetails &&
                    <Grid>
                        <Grid
                            style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
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

                        <FairValue/>
                        <StockInfo/>
                        <GrowthRateTable/>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
}

export default Analysis;
