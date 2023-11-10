import axios from 'axios';

export default async function getStockInfo (symbol) {
    const url = 'http://127.0.0.1:5000/StockInfo';
    const response = await axios.get(
        url,
        {
            params: {
                symbol
            }
        }
    );
    return response.data.toString();
}
