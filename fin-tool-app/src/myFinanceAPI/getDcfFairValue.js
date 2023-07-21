import axios from 'axios';

    export default async function getDcfFairValue (symbol, growthRate, dr, n) {
        const url = `http://127.0.0.1:5000/Dcf`;
        let response = await axios.get(
            url,
            {
                params: {
                    symbol: symbol,
                    growthRate: growthRate,
                    dr: dr,
                    n: n
                }
            }
        )

        return response.data.toString();       
    }