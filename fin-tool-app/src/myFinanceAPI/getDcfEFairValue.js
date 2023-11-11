import axios from 'axios';

export default async function getDcfEFairValue (symbol, growthRate, dr, n) {
    const url = 'http://127.0.0.1:5000/DcfE';
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

    return response;
}
