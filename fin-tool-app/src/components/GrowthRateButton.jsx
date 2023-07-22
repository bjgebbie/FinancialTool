import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import GrowthRateTable from "./GrowthRateTable";

function GrowthRateButton(props) {

    const {symbol} = props;
    const [clicked, setClicked] = useState(false);
    const [flag, setFlag] = useState(true);


    function handleClick() {
        if(clicked){
            setFlag(true)
        }else{
            setClicked(true);
        } 
    }

    return (
        <div>   
            {symbol !== '' && <Button onClick={handleClick} variant="success">Get Growth Rate</Button>}
            {clicked && <GrowthRateTable symbol={symbol} flag={flag} setFlag={setFlag}/> }
        </div>
    );
}

export default GrowthRateButton