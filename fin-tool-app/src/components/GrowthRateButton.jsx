import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import GrowthRateTable from "./GrowthRateTable";

function GrowthRateButton(props) {

    const {symbol} = props;
    const [clicked, setClicked] = useState(false);

    function handleChange() {
        setClicked(true);
    }

    return (
        <div>   
            {   
                symbol !== '' && <Button onClick={handleChange} variant="success">Get Growth Rate</Button>     
            }
            {clicked && <GrowthRateTable symbol={symbol}/>}
        </div>
    );
}

export default GrowthRateButton