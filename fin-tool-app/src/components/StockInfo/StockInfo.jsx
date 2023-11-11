import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector } from 'react-redux';

import getStockInfo from '../../myFinanceAPI/getStockInfo';

function StockInfo () {
    const { symbol } = useSelector((state) => state.inputs);
    const [currentPrice, setCurrentPrice] = useState('0.000');
    const [dilutedEps, setDilutedEps] = useState('0.000');
    const [eps, setEps] = useState('0.000');
    const [deRatio, setDeRatio] = useState('0.000');

    useEffect(() => {
        if (symbol !== '') {
            getStockInfo(symbol).then(
                (response) => {
                    const responseList = response.split(',');
                    setCurrentPrice(responseList[0]);
                    setDilutedEps(responseList[1]);
                    setEps(responseList[2]);
                    setDeRatio(responseList[3]);
                }
            );
        }
    }, [symbol]
    );

    return (
        <Grid>
            <ListGroup>
                <ListGroup.Item>Diluted EPS: {dilutedEps}</ListGroup.Item>
                <ListGroup.Item>EPS: {eps}</ListGroup.Item>
                <ListGroup.Item>Net D/E: {deRatio}</ListGroup.Item>
                <ListGroup.Item>P/E: {Math.round((currentPrice * 100 / eps)) / 100}</ListGroup.Item>
            </ListGroup>
        </Grid>
    );
}

export default StockInfo;
