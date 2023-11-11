import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getDcfEFairValue from '../../myFinanceAPI/getDcfEFairValue';
import getDcfFairValue from '../../myFinanceAPI/getDcfFairValue';
import ValuationMeter from '../ValuationMeter/ValuationMeter';
import './fair-value.css';

function FairValue () {
    const { symbol, growthRate, discountRate, years } = useSelector((state) => state.inputs);

    const [fairValue, setFairValue] = useState('0.000');
    const [fairValueEnterprise, setFairValueEnterprise] = useState('0.000');
    const [enterpriseValue, setEnterpriseValue] = useState('0.000');
    const [currentPrice, setCurrentPrice] = useState('0.000');

    useEffect(() => {
        getDcfFairValue(symbol, growthRate, discountRate, years).then(
            (response) => {
                const responseList = response.split(',');
                setCurrentPrice(responseList[0]);
                setFairValue(responseList[1]);
            }
        );
        getDcfEFairValue(symbol, growthRate, discountRate, years).then(
            (response) => {
                const responseList = response.split(',');
                setFairValueEnterprise(responseList[0]);
                setEnterpriseValue(responseList[1]);
            }
        );
    }, [symbol, growthRate, discountRate, years]);

    return (
        <Grid
            container
            className='fair-value-container'
        >
            <Grid
                item
                className='fair-value-item'
            >
                <Grid
                    className='fair-value-label'
                >
                    <Typography variant='h6'>{'Fair Value'}</Typography>
                </Grid>
                <Grid
                    className='fair-value-price'
                >
                    <Typography variant='h5'>${fairValue}</Typography>
                </Grid>

                {/* <Typography variant='h5'>{'Current Value'}</Typography>
                <Typography variant='h5'>${currentPrice}</Typography> */}
                <ValuationMeter
                    currentValue={currentPrice}
                    fairValue={fairValue}
                />
            </Grid>
            <Grid
                className='fair-value-enterprise-item'
            >
                <h2 className='fairValueItem'>{'Fair Enterprise Value'}</h2>
                <h2 className='fairValueText'>{fairValueEnterprise}</h2>
                <h2 className='fairValueItem'>{'Enterprise Value'}</h2>
                <h2 className='fairValueText'>${enterpriseValue}</h2>
                <ValuationMeter currentValue={enterpriseValue} fairValue={fairValueEnterprise}/>
            </Grid>
        </Grid>
    );
}

export default FairValue;
