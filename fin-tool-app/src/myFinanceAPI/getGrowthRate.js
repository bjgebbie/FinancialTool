import axios from 'axios';

    export default async function getGrowthRate (symbol, growthRateType) {
        const url = `http://127.0.0.1:5000/cagr`;
        let response = await axios.get(
            url,
            {
                params: {
                    symbol: symbol,
                    growthRateType: growthRateType,
                }
            }
        )
        return response.data.toString();       
    }