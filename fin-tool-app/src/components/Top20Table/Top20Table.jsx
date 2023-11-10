import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
 
function Top20Table() {
    
    useEffect(() => {
        // getTop20(growthRate, dr, n).then(
        //     (response) => {
        //         console.log(response)
        //     }
        // )
    }, []);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Valuation %</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Revenue</td>
                    <td>something</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Top20Table