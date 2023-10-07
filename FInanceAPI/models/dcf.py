import numpy as np
import yfinance as yf
from utils.sp500 import getSp500Companies

''' 
    ocf: operating cash flow 
    dr: discount rate (return you want to achieve)
    p2fcf: price to free cash flow
    growth: growth rate of the company
    mce: maintenance capital expenditure (AKA properties, plant and equipment)
    n: how many years we are we are discounting into the future
    csms: cash and short-term marketable securities
    tso: total shares outstanding
    
    Model:
     1. Calculate Free Cash Flow (fcf) which is ocf - mce
     2. Apply growth rate for each year until n years have been applied, this gives tv (Terminal Value)
     3. Multiply tv by p2fcf
     4. Calculate dcf by using sum(fcf / ((1 + dr)^i) )  
     5. Add csms to dcf
     6. dcf / total shares outstanding yields fair price
'''
class DCF:
    def __init__(self, cash_flow, balance_sheet, dr, growth_rate, n, tso, market_cap, closing_price):
        self.cash_flow = cash_flow[list(cash_flow)[0]]
        self.balance_sheet = balance_sheet[list(balance_sheet)[0]]

        self.ocf = self.cash_flow['Operating Cash Flow']
        self.mce = self.cash_flow['Net PPE Purchase And Sale'] if 'Net PPE Purchase And Sale' in self.cash_flow else 0.0
        self.csms = self.balance_sheet['Cash Cash Equivalents And Short Term Investments'] if 'Cash Cash Equivalents And Short Term Investments' in self.balance_sheet else 0.0
        self.dr = dr
        self.fcf = self.ocf + self.mce
        self.p2fcf = market_cap / self.fcf
        self.growth_rate = growth_rate
        self.n = n
        self.tso = tso
        self.closing_price = closing_price

    def calculate(self): 
        sumOfDcf = 0 
        dcf = 0
        termVal = 0
        discTermVal = 0

        for i in range(self.n): 
            self.fcf = self.fcf * (self.growth_rate + 1)
            dcf = self.fcf / ((1 + self.dr) ** (i + 1))
            sumOfDcf = dcf + sumOfDcf
        termVal = self.fcf * self.p2fcf
        discTermVal = termVal / ((1 + self.dr) ** self.n)
        value = (sumOfDcf + discTermVal + self.csms) / self.tso

        return [str(round(self.closing_price,3 )), str(round(value, 3))]
    
    def get(request, symbol=None):
        if symbol == None:
            symbol = request.args.get('symbol')
        
        growth_rate = request.args.get('growthRate')
        dr = request.args.get('dr')
        n = request.args.get('n')

        data = yf.Ticker(symbol)
        cash_flow = data.cash_flow.to_dict()
        balance_sheet = data.balance_sheet.to_dict()

        tso = data.get_shares_full(start='2023-01-01', end=None)
        tso = tso[-1]

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