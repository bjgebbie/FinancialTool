import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import FairValue from '../../components/FairValue/FairValue';
import GrowthRateTable from '../../components/GrowthRateTable/GrowthRateTable';
import StockInfo from '../../components/StockInfo/StockInfo';
import TextInput from '../../components/TextInput/TextInput';
import { setDiscountRate, setGrowthRate, setYears } from '../../features/inputs';
import './analysis.css';

function Analysis () {
    const { symbol, growthRate, discountRate, years } = useSelector((state) => state.inputs);

    return (
        <Grid
            className='analysis-grid-container'
            container
        >
            <Grid
                sx={{
                    flexDirection: 'column'
                }}
                className='analysis-grid'
            >
                <Grid
                    item
                    className='text-inputs-grid-item'
                >
                    <TextInput
                        label={'Growth Rate'}
                        value={growthRate}
                        storeSetter={setGrowthRate}
                    />
                    <TextInput
                        label={'Discount Rate'}
                        value={discountRate}
                        storeSetter={setDiscountRate}
                    />
                    <TextInput
                        label={'Years'}
                        value={years}
                        storeSetter={setYears}
                    />
                </Grid>
                <StockInfo/>

            </Grid>
            {
                <Grid
                    style={{
                        display: 'flex'
                    }}>
                    {symbol !== '' && <FairValue/>}
                    <GrowthRateTable/>
                </Grid>}
        </Grid>
    );
}

export default Analysis;
