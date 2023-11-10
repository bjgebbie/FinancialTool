import axios from 'axios';

export default async function getDcfFairValue (symbol, growthRate, dr, n) {
    const url = 'http://127.0.0.1:5000/Dcf';
    const response = await axios.get(
        url,
        {
            params: {
                symbol,
                growthRate,
                dr,
                n
            }
        }
    );

    return response.data.toString();
}
