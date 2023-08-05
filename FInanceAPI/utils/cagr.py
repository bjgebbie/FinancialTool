import yfinance as yf

class CAGR:
    def get(request):
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

        cagr = str(round(cagr.real, 4))
        
        return cagr