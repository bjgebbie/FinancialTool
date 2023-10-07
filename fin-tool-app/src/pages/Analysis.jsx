import React, { useState } from 'react';
import FairValue from '../components/FairValue';
import GrowthRateTable from '../components/GrowthRateTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import StockInfo from "../components/StockInfo";
import '../css/analysisPage.css';

function Analysis () {
    
    const [symbol, setSymbol] = useState('');
    const [growthRate, setGrowthRate] = useState('0.10');
    const [dr, setDr] = useState('0.15');
    const [n, setN] = useState('10');
    const [selectedSymbol, setSelectedSymbol] = useState('0.00');
    const [selectedGr, setSelectedGr] = useState('0.00');
    const [selectedDr, setSelectedDr] = useState('0.00');
    const [selectedN, setSelectedN] = useState('0.00');

    const [showDetails, setShowDetails] = useState(false);

    function handleSymbolChange (event) {
        setSymbol(event.target.value);
    }
    function handleGrowthRateChange (event) {
        setGrowthRate(event.target.value);
    }
    function handleDrChange (event) {
        setDr(event.target.value);
    }
    function handleNChange (event) {
        setN(event.target.value);
    }
    function handleBlur(){
        if (symbol !== '') {
            setShowDetails(true);
            setSelectedSymbol(symbol);
        } else {
            setShowDetails(false);
        }
        setSelectedGr(growthRate);
        setSelectedDr(dr);
        setSelectedN(n);
    }

    return (
        <div>
            <Container>        
                <Stack gap={12}>
                    <Col>
                        <h1 className='title'> Brady's Financial App</h1>
                        <input className= 'symbolInput' placeholder='Symbol' type="text" value={symbol} onChange={handleSymbolChange} onBlur={handleBlur}/>
                    </Col>
                    <Row> 
                        {showDetails &&
                            <>
                                <Col md={{ span: 2, offset: 2}} >
                                    {   
                                        <Stack md>
                                            <p className='pStyles'>Growth Rate: <input className='inputsStyle' type="text" value={growthRate} onChange={handleGrowthRateChange} onBlur={handleBlur}/></p>
                                            <p className='pStyles'>Discount Rate: <input className='inputsStyle' type="text" value={dr} onChange={handleDrChange} onBlur={handleBlur}/></p>
                                            <p className='pStyles'>Time in Years: <input className='inputsStyle' type="text" value={n} onChange={handleNChange} onBlur={handleBlur}/></p>
                                        </Stack>
                                    }
                                </Col>
                                <Col md={{ span: 4}}>
                                    <FairValue symbol={selectedSymbol} growthRate={selectedGr} dr={selectedDr} n={selectedN}/>
                                </Col>
                                <Col className='col-2' md={{ offset: 1 }}>
                                    {
                                        <div className="infoPanel">
                                            <StockInfo symbol={selectedSymbol}/>
                                            <GrowthRateTable symbol={selectedSymbol} />
                                        </div>
                                    }
                                </Col>
                           </>
                        }
                    </Row>
                </Stack>
            </Container>
        </div>
    );
}

export default Analysis