import React, { useState } from "react";
import Table from 'react-bootstrap/Table'
import getGrowthRate from "../myFinanceAPI/getGrowthRate";


function GrowthRateTable(props) {
    const {symbol, flag, setFlag} = props;
    const [revenueGR, setRevenueGR] = useState('0.00');
    const [epsDGR, setEpsD] = useState('0.00');
    const [equityGR, setequityGR] = useState('0.00');
    const [fcfGR, setFcfGrowthRate] = useState('0.00');

    if (flag){
        getGrowthRate(symbol, 'Revenue').then(
            (response) => {
                setRevenueGR(response)
            }
        );
        getGrowthRate(symbol, 'Equity').then(
            (response) => {
                setequityGR(response)
            }
        );
        getGrowthRate(symbol, 'EPS (Diluted)').then(
            (response) => {
                setEpsD(response)
            }
        );
        getGrowthRate(symbol, 'FCF').then(
            (response) => {
                setFcfGrowthRate(response)
            }
        )
        setFlag(!flag);
    }
    
        
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Method</th>
                <th>Growth Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Revenue</td>
                    <td>{revenueGR}</td>
                </tr>
                <tr>
                    <td>EPS (Diluted)</td>
                    <td>{epsDGR}</td>
                </tr>
                <tr>
                    <td>FCF</td>
                    <td>{fcfGR}</td>
                </tr>
                <tr>
                    <td>Equity</td>
                    <td>{equityGR}</td>
                </tr>
        </tbody>
        </Table>
    );
}

export default GrowthRateTable