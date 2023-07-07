import React, { Component } from 'react';

export default class TenK extends Component{
    constructor() {
        super();
        this.state = { data: [] };
      }
    async getThing() {
        const url = 'https://twelve-data1.p.rapidapi.com/symbol_search?symbol=AA&outputsize=30';
        const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '67d13b4d03msh4c308b39cdedb1dp145c47jsnf25c62aaffac',
            'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
            }
        };
        

        const response = await fetch(url, options);
        console.log(response);
        const result = response.json();
        console.log(result);
        return JSON.stringify(result);        
    }
    render() {
        return (
            <div>
                { this.getThing() }
            </div>
        )
    }
}