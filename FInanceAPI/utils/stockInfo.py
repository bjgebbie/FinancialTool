import yfinance as yf
from utils.sp500 import getSp500Companies
from flask import jsonify

class StockInfo:
    def get(request):

        symbol = request.args.get('symbol')
        data = yf.Ticker(symbol)

        if symbol == '' or symbol.upper() not in getSp500Companies():
            return [0, 0, 0, 0]

        balance_sheet = data.balance_sheet.to_dict()
    
        net_debt = 0.0
        if 'Net Debt' in balance_sheet[list(balance_sheet)[0]]:
            net_debt = balance_sheet[list(balance_sheet)[0]]['Net Debt']

        shareholder_equity = balance_sheet[list(balance_sheet)[0]]['Stockholders Equity']
        de_ratio = net_debt / shareholder_equity

        income_stmt = data.income_stmt.to_dict()
        diluted_eps = income_stmt[list(income_stmt)[0]]['Diluted EPS']
        eps = income_stmt[list(income_stmt)[0]]['Basic EPS']

        hist = data.history(period="1d")
        closing_dict = hist.to_dict()['Close']
        closing_price = next(iter(closing_dict.values()))

        payload = {
                    'currentValue': round(closing_price, 4), 
                    'dilutedEps': diluted_eps,
                    'eps': eps, 
                    'de': round(de_ratio, 4)
                  }
        response = jsonify(payload)

        return (response)