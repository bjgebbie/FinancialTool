import { Box, ListItem, List, ListItemText } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentValue } from '../../features/values';
import getStockInfo from '../../myFinanceAPI/getStockInfo';
import './stock-info.css';

function StockInfo () {
    const dispatch = useDispatch();
    const { symbol } = useSelector((state) => state.inputs);
    const { currentValue } = useSelector((state) => state.values);
    const [dilutedEps, setDilutedEps] = useState('0.000');
    const [eps, setEps] = useState('0.000');
    const [deRatio, setDeRatio] = useState('0.000');

    useEffect(() => {
        getStockInfo(symbol).then(
            (response) => {
                const stockInfo = response.data;
                dispatch(setCurrentValue(stockInfo.currentValue));
                setDilutedEps(stockInfo.dilutedEps);
                setEps(stockInfo.eps);
                setDeRatio(stockInfo.de);
            }
        );
    }, [symbol, currentValue]);

    return (
        <Box
            className='stock-info-box'
        >
            <List
                sx={{
                    padding: 0
                }}
            >
                <ListItem divider>
                    <ListItemText className='list-text' primary={'Current Price'}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={'Diluted Eps'}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={'Net D/E'}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={'P/E'}/>
                </ListItem>
            </List>
            <List
                sx={{ padding: 0 }}
            >
                <ListItem divider>
                    <ListItemText className='list-text' primary={`$${currentValue}`}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={`${dilutedEps}`}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={`${deRatio}`}/>
                </ListItem>
                <ListItem divider>
                    <ListItemText className='list-text' primary={`${Math.round((parseFloat(currentValue) * 100 / eps)) / 100}`}/>
                </ListItem>
            </List>
        </Box>
    );
}

export default StockInfo;
