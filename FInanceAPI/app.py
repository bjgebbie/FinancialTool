from flask import Flask, request
from flask_cors import CORS
from models.dcf import DCF
from models.dcfEnterprise import DCFEnterprise
from utils.cagr import CAGR
from utils.stockInfo import StockInfo


app = Flask(__name__)
CORS(app)

@app.route('/Dcf')
def get_dcf():
    return DCF.get(request)

@app.route('/DcfE')
def get_dcf_e():
    return DCFEnterprise.get(request)

@app.route('/cagr')
def get_cagr():
    return CAGR.get(request)


@app.route('/StockInfo')
def get_stock_info():
    return StockInfo.get(request)

if __name__ == '__main__':
    app.run(host='0.0.0.0')