import { Grid, Typography, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFairValue, setFairEnterpriseValue, setEnterpriseValue } from '../../features/values';
import getDcfEFairValue from '../../myFinanceAPI/getDcfEFairValue';
import getDcfFairValue from '../../myFinanceAPI/getDcfFairValue';
import ValuationMeter from '../ValuationMeter/ValuationMeter';
import './fair-value.css';

const formatLongNumber = (value) => {
    let formattedValue;
    if (value.length > 16) {
        formattedValue = `${value.substring(0, value.length - 13)} Billions`;
        return formattedValue;
    }
    formattedValue = `${value.substring(0, value.length - 10)} Millions`;
    return formattedValue;
};

function FairValue () {
    const dispatch = useDispatch();
    const { symbol, growthRate, discountRate, years } = useSelector((state) => state.inputs);
    const { currentValue, fairValue, fairEnterpriseValue, enterpriseValue } = useSelector((state) => state.values);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFairValues () {
            setLoading(true);
            await getDcfFairValue(symbol, growthRate, discountRate, years).then(
                (response) => {
                    const fairValue = response.data.value;
                    dispatch(setFairValue(fairValue));
                }
            );
            await getDcfEFairValue(symbol, growthRate, discountRate, years).then(
                (response) => {
                    const fairEnterpriseValue = response.data.fairEnterpriseValue;
                    const enterpriseValue = response.data.enterpriseValue;
                    dispatch(setFairEnterpriseValue(fairEnterpriseValue));
                    dispatch(setEnterpriseValue(enterpriseValue));
                }
            );
            setLoading(false);
        }
        fetchFairValues();
    }, [symbol, growthRate, discountRate, years]);

    return (
        <Grid
            container
            sx={{
                flexDirection: 'column'
            }}
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
                    {loading
                        ? <Skeleton
                            height={32}
                            sx={{ transform: 'scaleY(1.0)' }}
                            className='value-skeleton'
                        />
                        : <Typography
                            variant='h5'>
                                ${fairValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </Typography>}
                </Grid>
                {loading
                    ? <Skeleton
                        variant='rectangle'
                        height={30}
                        className='progress-bar-skeleton' />
                    : <ValuationMeter
                        currentValue={currentValue}
                        fairValue={fairValue}
                    />}
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
                        <Typography variant='h6'>{'Fair Enterprise Value'}</Typography>
                    </Grid>
                    <Grid
                        className='fair-value-price'
                    >
                        {loading
                            ? <Skeleton
                                height={32}
                                sx={{ transform: 'scaleY(1.0)' }}
                                className='value-skeleton'
                            />
                            : <Typography
                                variant='h6'>
                                    ${formatLongNumber(fairEnterpriseValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>}
                    </Grid>
                    {loading
                        ? <Skeleton
                            variant='rectangle'
                            height={30}
                            className='progress-bar-skeleton' />
                        : <ValuationMeter
                            currentValue={enterpriseValue}
                            fairValue={fairEnterpriseValue}
                        />}
                    <Grid
                        className='fair-value-label'
                    >
                        <Typography variant='h6'>{'Enterprise Value'}</Typography>
                    </Grid>
                    <Grid
                        className='fair-value-price'
                    >
                        {loading
                            ? <Skeleton
                                height={32}
                                sx={{ transform: 'scaleY(1.0)' }}
                                className='value-skeleton'
                            />
                            : <Typography
                                variant='h6'>
                                ${formatLongNumber(enterpriseValue).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Typography>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default FairValue;
