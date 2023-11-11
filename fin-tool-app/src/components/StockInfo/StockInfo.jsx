import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentValue } from '../../features/values';
import getStockInfo from '../../myFinanceAPI/getStockInfo';

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
        <Grid>
            <ListGroup>
                <ListGroup.Item>Current Price: {currentValue}</ListGroup.Item>
                <ListGroup.Item>Diluted EPS: {dilutedEps}</ListGroup.Item>
                <ListGroup.Item>EPS: {eps}</ListGroup.Item>
                <ListGroup.Item>Net D/E: {deRatio}</ListGroup.Item>
                <ListGroup.Item>P/E: {Math.round((parseFloat(currentValue) * 100 / eps)) / 100}</ListGroup.Item>
            </ListGroup>
        </Grid>
    );
}

export default StockInfo;
