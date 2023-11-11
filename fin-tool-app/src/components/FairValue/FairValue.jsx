import { Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFairValue, setFairEnterpriseValue, setEnterpriseValue } from '../../features/values';
import getDcfEFairValue from '../../myFinanceAPI/getDcfEFairValue';
import getDcfFairValue from '../../myFinanceAPI/getDcfFairValue';
import ValuationMeter from '../ValuationMeter/ValuationMeter';
import './fair-value.css';

function FairValue () {
    const dispatch = useDispatch();
    const { symbol, growthRate, discountRate, years } = useSelector((state) => state.inputs);
    const { fairValue, fairEnterpriseValue, enterpriseValue } = useSelector((state) => state.values);

    useEffect(() => {
        getDcfFairValue(symbol, growthRate, discountRate, years).then(
            (response) => {
                const fairValue = response.data.value;
                dispatch(setFairValue(fairValue));
            }
        );
        getDcfEFairValue(symbol, growthRate, discountRate, years).then(
            (response) => {
                const fairEnterpriseValue = response.data.fairEnterpriseValue;
                const enterpriseValue = response.data.enterpriseValue;
                dispatch(setFairEnterpriseValue(fairEnterpriseValue));
                dispatch(setEnterpriseValue(enterpriseValue));
            }
        );
    }, [symbol, growthRate, discountRate, years]);

    return (
        <Grid
            container
            sx={{ flexDirection: 'column' }}
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
                    <Typography variant='h5'>${fairValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Typography>
                </Grid>
                <ValuationMeter/>
            </Grid>
            <Grid
                className='fair-value-item'
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
                        <Typography variant='h5'>${fairEnterpriseValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Typography>
                    </Grid>
                    <ValuationMeter/>
                    <Grid
                        className='fair-value-label'
                    >
                        <Typography variant='h6'>{'Enterprise Value'}</Typography>
                    </Grid>
                    <Grid
                        className='fair-value-price'
                    >
                        <Typography variant='h5'>${enterpriseValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FairValue;
