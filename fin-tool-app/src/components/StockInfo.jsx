import React , { useState, useEffect }from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import getStockInfo from '../myFinanceAPI/getStockInfo';

function StockInfo (props) {
    const { symbol } = props 
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
                        setDeRatio(responseList[3])
                    }
                );
            }
        }, [symbol]
      );
    
    return(
        <Container>
            <ListGroup>
                <ListGroup.Item>Diluted EPS: {dilutedEps}</ListGroup.Item>
                <ListGroup.Item>EPS: {eps}</ListGroup.Item>
                <ListGroup.Item>Net D/E: {deRatio}</ListGroup.Item>
                <ListGroup.Item>P/E: {Math.round((currentPrice * 100/ eps))/100}</ListGroup.Item>
            </ListGroup>
        </Container>
    )
    
}

export default StockInfo