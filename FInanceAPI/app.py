from flask import Flask, request
import yfinance as yf
from flask_cors import CORS
from models.dcf import DCF

app = Flask(__name__)
CORS(app)

@app.route('/Dcf')
def get_dcf_input():

    symbol = request.args.get('symbol')
    data = yf.Ticker(symbol)
    cashFlow = data.cashflow.to_dict()
    balance_sheet = data.balance_sheet.to_dict()

    tso = data.get_shares_full(start='2023-01-01', end=None)
    tso = tso[tso.size-1]

    return DCF(cashFlow, balance_sheet, 0.15, 0.10, 10, tso).calculate()


if __name__ == '__main__':
    app.run(host='0.0.0.0')