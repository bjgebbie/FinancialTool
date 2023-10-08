import React, { useState, useEffect} from 'react';
import getDcfFairValue from '../../myFinanceAPI/getDcfFairValue';
import getDcfEFairValue from '../../myFinanceAPI/getDcfEFairValue'
import Container from 'react-bootstrap/Container';
import ValuationMeter from '../ValuationMeter/ValuationMeter';
import getTop20 from '../../myFinanceAPI/getTop20';


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
            }
        )
        getDcfEFairValue(symbol, growthRate, dr, n).then(
            (response) => {
                const responseList = response.split(',')
                setFairValueE(responseList[0])
                setEnterpriseValue(responseList[1])
            }
        )
        // getTop20(growthRate, dr, n).then(
        //     (response) => {
        //         console.log(response)
        //     }
        // )
    }, [symbol, growthRate, dr, n])

    return (
        <div className='fairValue'>
            <Container>
                <h2 className='fairValueItem'>Fair Value</h2>
                <h2 className='fairValueText'>${fairValue}</h2>
                <h2 className='fairValueItem'>Current Value</h2>
                <h2 className='fairValueText'> {currentPrice} </h2>
                <ValuationMeter currentValue={currentPrice} fairValue={fairValue}/>
            </Container>
            <Container style={{marginTop: 20}}>
                <h2 className='fairValueItem'>Fair Enterprise Value </h2> 
                <h2 className='fairValueText'>{fairValueE}</h2>
                <h2 className='fairValueItem'>Enterprise Value</h2>
                <h2 className='fairValueText'>${enterpriseValue}</h2>
                <ValuationMeter currentValue={enterpriseValue} fairValue={fairValueE}/>
            </Container>
        </div>
    )
}

export default FairValue