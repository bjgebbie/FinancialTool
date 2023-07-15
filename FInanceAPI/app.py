from flask import Flask
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return 'hello'

@app.route('/CashFlow')
def getDcfInput():
    data = yf.Ticker('CVS')
    print(data.cashflow)
    return str(data.cashflow)


if __name__ == '__main__':
    app.run(host='0.0.0.0')