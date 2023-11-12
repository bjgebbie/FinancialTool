import axios from 'axios';

export default function getDcfEFairValue (symbol, growthRate, dr, n) {
    const url = 'http://127.0.0.1:5000/DcfE';
    const response = axios.get(
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
