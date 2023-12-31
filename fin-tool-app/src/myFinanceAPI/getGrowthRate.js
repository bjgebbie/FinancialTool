import axios from 'axios';

export default async function getGrowthRate (symbol, growthRateType) {
    const url = 'http://127.0.0.1:5000/cagr';
    const response = await axios.get(
        url,
        {
            params: {
                symbol,
                growthRateType
            }
        }
    );
    return response;
}
