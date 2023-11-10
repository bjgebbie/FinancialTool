import axios from 'axios';

export default async function getTop20 (growthRate, dr, n) {
    const url = 'http://127.0.0.1:5000/Top20';
    const response = await axios.get(
        url,
        {
            params: {
                growthRate,
                dr,
                n
            }
        }
    );
    return response.data.toString();
}
