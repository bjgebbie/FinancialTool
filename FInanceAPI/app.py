from flask import Flask, request
import yfinance as yf
from flask_cors import CORS
from models.dcf import DCF

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
    cash_flow = data.cashflow.to_dict()
    balance_sheet = data.balance_sheet.to_dict()

    tso = data.get_shares_full(start='2023-01-01', end=None)
    tso = tso[tso.size-1]

    market_cap = data.fast_info.market_cap

    return DCF(cash_flow, 
               balance_sheet, 
               float(dr), 
               float(growth_rate), 
               int(n), 
               tso, 
               market_cap).calculate()

@app.route('/cagr')
def get_cagr():
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

    return str(round(cagr,4))


if __name__ == '__main__':
    app.run(host='0.0.0.0')