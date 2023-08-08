import React, { useState } from 'react';
import FairValue from '../components/FairValue';
import GrowthRateTable from '../components/GrowthRateTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import StockInfo from "../components/StockInfo";
import '../css/titleBarStyle.css';

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
        <div class='style'>
            <Container>        
                <h1 class='style'> Brady's Financial App</h1>
                <input class='style' placeholder='Symbol' type="text" value={symbol} onChange={handleSymbolChange} onBlur={handleBlur}/>
                <Stack gap={12}>
 
                    <Row  md={{ span: 4, offset: 10 }}> 
                        {showDetails &&
                        <React.Fragment>
                        <Col >
                        <React.Fragment>
                            {   showDetails &&
                                <React.Fragment>
                                    <p>Growth Rate: <input type="text" value={growthRate} onChange={handleGrowthRateChange} onBlur={handleBlur}/></p>
                                    <p>Discount Rate: <input type="text" value={dr} onChange={handleDrChange} onBlur={handleBlur}/></p>
                                    <p>How many years: <input type="text" value={n} onChange={handleNChange} onBlur={handleBlur}/></p>
                                    <FairValue symbol={selectedSymbol} growthRate={selectedGr} dr={selectedDr} n={selectedN}/>
                                </React.Fragment>
                            }
                        </React.Fragment>
                        </Col>
                        <Col>
                        {
                            showDetails &&
                            <React.Fragment>
                                <StockInfo symbol={selectedSymbol} />
                                <GrowthRateTable symbol={selectedSymbol} />
                            </React.Fragment>
                        }
                        </Col>
                        </React.Fragment>

                        }
                    </Row>
                </Stack>

            </Container>
            

        </div>
    );
}

export default Analysis