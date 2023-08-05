import React, { useState, useEffect} from 'react';
import getDcfFairValue from '../myFinanceAPI/getDcfFairValue';
import getDcfEFairValue from '../myFinanceAPI/getDcfEFairValue'
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ValuationMeter from './ValuationMeter';


function FairValue(props) {
    const {symbol, growthRate, dr, n} = props;
    const [fairValue, setFairValue] = useState('0.000');
    const [fairValueE, setFairValueE] = useState('0.000');
    const [enterpriseValue, setEnterpriseValue] = useState('0.000');
    const [currentPrice, setCurrentPrice] = useState('0.000');

    useEffect(() => {
        getDcfFairValue(symbol, growthRate, dr, n).then(
            (response) => {
                const responseList = response.split(',')
                setCurrentPrice(responseList[0]);
                setFairValue(responseList[1]);
                console.log(responseList)
            }
        )
        getDcfEFairValue(symbol, growthRate, dr, n).then(
            (response) => {
                const responseList = response.split(',')
                setFairValueE(responseList[0])
                setEnterpriseValue(responseList[1])
            }
        )
    }, [symbol, growthRate, dr, n])

    return (
        <div>
            <Container>
                <ListGroup>
                    <ListGroup.Item><h1>Fair Value: ${fairValue}</h1></ListGroup.Item>
                    <ListGroup.Item><h1>Current Value: ${currentPrice}</h1></ListGroup.Item>
                </ListGroup>
                <ValuationMeter currentValue={currentPrice} fairValue={fairValue}/>
                <ListGroup>
                    <ListGroup.Item><h1>Fair Enterprise Value: ${fairValueE}</h1></ListGroup.Item>
                    <ListGroup.Item><h1>Enterprise Value: ${enterpriseValue}</h1></ListGroup.Item>
                </ListGroup>
                <ValuationMeter currentValue={enterpriseValue} fairValue={fairValueE}/>

            </Container>
            
        </div>
    )
}

export default FairValue