from flask import Flask, request
import yfinance as yf
from flask_cors import CORS
from models.dcf import DCF
from models.dcfEnterprise import DCFEnterprise

app = Flask(__name__)
CORS(app)

@app.route('/Dcf')
def get_dcf():

    symbol = request.args.get('symbol')
    if symbol == '':
        return ''
    
    growth_rate = request.args.get('growthRate')
    dr = request.args.get('dr')
    n = request.args.get('n')

    data = yf.Ticker(symbol)
    cash_flow = data.cash_flow.to_dict()
    balance_sheet = data.balance_sheet.to_dict()

    tso = data.get_shares_full(start='2023-01-01', end=None)
    tso = tso[tso.size-1]

    market_cap = data.fast_info.market_cap

    hist = data.history(period="1d")
    closing_dict = hist.to_dict()['Close']
    closing_price = next(iter(closing_dict.values()))

    return DCF(cash_flow, 
               balance_sheet, 
               float(dr), 
               float(growth_rate), 
               int(n), 
               tso, 
               market_cap,
               closing_price).calculate()

@app.route('/DcfE')
def get_dcf_e():

    symbol = request.args.get('symbol')
    if symbol == '':
        return ''
    
    growth_rate = request.args.get('growthRate')
    dr = request.args.get('dr')
    n = request.args.get('n')

    data = yf.Ticker(symbol)
    cash_flow = data.cash_flow.to_dict()
    balance_sheet = data.balance_sheet.to_dict()

    tso = data.get_shares_full(start='2023-01-01', end=None)
    tso = tso[tso.size-1]

    market_cap = data.fast_info.market_cap

    return DCFEnterprise(cash_flow, 
               balance_sheet, 
               float(dr), 
               float(growth_rate), 
               int(n), 
               tso, 
               market_cap).calculate()

@app.route('/cagr')
def get_cagr():
    try:
        symbol = request.args.get('symbol')
        growth_rate_type = request.args.get('growthRateType')

        data = yf.Ticker(symbol)

        cash_flow_statement = data.cash_flow.to_dict()
        balance_sheet = data.balance_sheet.to_dict()
        income_stmt = data.income_stmt.to_dict()
        
        ev = 1
        bv = 1
        if growth_rate_type == 'FCF':
            ev = cash_flow_statement[list(cash_flow_statement)[0]]['Free Cash Flow']
            bv = cash_flow_statement[list(cash_flow_statement)[-1]]['Free Cash Flow']
        if growth_rate_type == 'Revenue':
            ev = income_stmt[list(income_stmt)[0]]['Total Revenue']
            bv = income_stmt[list(income_stmt)[-1]]['Total Revenue']
        if growth_rate_type == 'Equity':
            ev = balance_sheet[list(balance_sheet)[0]]['Total Equity Gross Minority Interest']
            bv = balance_sheet[list(balance_sheet)[-1]]['Total Equity Gross Minority Interest']
        if growth_rate_type == 'EPS (Diluted)':
            ev = income_stmt[list(income_stmt)[0]]['Diluted EPS']
            bv = income_stmt[list(income_stmt)[-1]]['Diluted EPS']

        cagr = (((ev/bv)**(1/len(cash_flow_statement)))-1)

        if str(type(cagr)) == "<class 'complex'>":
            return str(round(cagr.real, 4))
        
        return str(round(cagr, 4))
    except Exception as e:
        print(e)
    

@app.route('/StockInfo')
def get_stock_info():
    symbol = request.args.get('symbol')
    data = yf.Ticker(symbol)

    balance_sheet = data.balance_sheet.to_dict()
    net_debt = balance_sheet[list(balance_sheet)[0]]['Net Debt']
    shareholder_equity = balance_sheet[list(balance_sheet)[0]]['Stockholders Equity']
    de_ratio = net_debt / shareholder_equity

    income_stmt = data.income_stmt.to_dict()
    diluted_eps = income_stmt[list(income_stmt)[0]]['Diluted EPS']
    eps = income_stmt[list(income_stmt)[0]]['Basic EPS']

    hist = data.history(period="1d")
    closing_dict = hist.to_dict()['Close']
    closing_price = next(iter(closing_dict.values()))

    return [round(closing_price, 4), diluted_eps, eps, round(de_ratio, 4)]

if __name__ == '__main__':
    app.run(host='0.0.0.0')