import yfinance as yf
from utils.sp500 import getSp500Companies
from flask import jsonify

class CAGR:
    def get(request):
        symbol = request.args.get('symbol')
        growth_rate_type = request.args.get('growthRateType')

        if symbol == '' or symbol.upper() not in getSp500Companies():
            return [0.00]

        data = yf.Ticker(symbol)

        cash_flow_statement = data.cash_flow.to_dict()
        balance_sheet = data.balance_sheet.to_dict()
        income_stmt = data.income_stmt.to_dict()
        
        ev = 1
        bv = 1

        ev = cash_flow_statement[list(cash_flow_statement)[0]]['Free Cash Flow']
        bv = cash_flow_statement[list(cash_flow_statement)[-1]]['Free Cash Flow']
        cagr = (((ev/bv)**(1/len(cash_flow_statement)))-1)
        cagr = str(round(cagr.real, 4))
        fcf = cagr

        ev = income_stmt[list(income_stmt)[0]]['Total Revenue']
        bv = income_stmt[list(income_stmt)[-1]]['Total Revenue']
        cagr = (((ev/bv)**(1/len(cash_flow_statement)))-1)
        cagr = str(round(cagr.real, 4))
        revenue = cagr

        ev = balance_sheet[list(balance_sheet)[0]]['Total Equity Gross Minority Interest']
        bv = balance_sheet[list(balance_sheet)[-1]]['Total Equity Gross Minority Interest']
        cagr = (((ev/bv)**(1/len(cash_flow_statement)))-1)
        cagr = str(round(cagr.real, 4))
        equity = cagr
    
        ev = income_stmt[list(income_stmt)[0]]['Diluted EPS']
        bv = income_stmt[list(income_stmt)[-1]]['Diluted EPS']
        cagr = (((ev/bv)**(1/len(cash_flow_statement)))-1)
        cagr = str(round(cagr.real, 4))
        diluted_eps = cagr


        
        payload = {
            'fcf': fcf,
            'revenue': revenue,
            'equity': equity,
            'dilutedEps': diluted_eps
        }
        response = jsonify(payload)
        return response