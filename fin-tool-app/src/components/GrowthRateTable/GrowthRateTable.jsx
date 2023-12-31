import { Box, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setGrowthRate } from '../../features/inputs';
import getGrowthRate from '../../myFinanceAPI/getGrowthRate';
import './growth-rate-table.css';

function GrowthRateTable () {
    const dispatch = useDispatch();
    const { symbol } = useSelector((state) => state.inputs);
    const [revenueGR, setRevenueGR] = useState('0.00');
    const [epsDGR, setEpsD] = useState('0.00');
    const [equityGR, setEquityGR] = useState('0.00');
    const [fcfGR, setFcfGrowthRate] = useState('0.00');

    useEffect(() => {
        getGrowthRate(symbol, 'Revenue').then(
            (response) => {
                const growthRates = response.data;
                setRevenueGR(growthRates.revenue);
                setEpsD(growthRates.dilutedEps);
                setEquityGR(growthRates.equity);
                setFcfGrowthRate(growthRates.fcf);
            }
        );
    }, [symbol]
    );

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box
                className='growth-rate-title-box'
            >
                {'Growth Rates'}
            </Box>
            <Box
                className='growth-rate-table-box'
            >
                <List
                    sx={{
                        padding: '0'
                    }}
                >
                    <ListItem
                        divider>
                        <ListItemText
                            className='list-text'
                            primary='FCF' />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText
                            className='list-text'
                            primary='Revenue' />
                    </ListItem>
                    <ListItem
                        className='list-text'
                        divider>
                        <ListItemText primary='Diluted EPS' />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            className='list-text'
                            primary='Equity' />
                    </ListItem>
                </List>
                <List
                    sx={{
                        padding: '0'
                    }}
                >
                    <ListItemButton
                        divider
                        onClick={() => dispatch(setGrowthRate(fcfGR))}
                    >
                        <ListItemText primary={fcfGR}/>
                    </ListItemButton>
                    <ListItemButton
                        divider
                        onClick={() => dispatch(setGrowthRate(revenueGR))}
                    >
                        <ListItemText primary={revenueGR} />
                    </ListItemButton>
                    <ListItemButton
                        divider
                        onClick={() => dispatch(setGrowthRate(epsDGR))}
                    >
                        <ListItemText primary={epsDGR} />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => dispatch(setGrowthRate(equityGR))}
                    >
                        <ListItemText primary={equityGR} />
                    </ListItemButton>
                </List>
            </Box>
        </Box>
    );
}

export default GrowthRateTable;
