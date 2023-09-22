from utils.enterpriseValue import get_enterprise_value
from utils.sp500 import getSp500Companies
import yfinance as yf
import numpy as np

class DCFEnterprise:
    def __init__(self, cash_flow, balance_sheet, dr, growth_rate, n, tso, market_cap):
        self.cash_flow = cash_flow[list(cash_flow)[0]]
        self.balance_sheet = balance_sheet[list(balance_sheet)[0]]
        self.ocf = self.cash_flow['Operating Cash Flow']
        self.mce = self.cash_flow['Net PPE Purchase And Sale'] if not np.isnan(self.cash_flow['Net PPE Purchase And Sale']) else 0.0
        self.dr = dr
        self.fcf = self.ocf + self.mce
        self.market_cap = market_cap
        self.p2fcf =  market_cap / self.fcf
        self.growth_rate = growth_rate
        self.csms = self.balance_sheet['Cash Cash Equivalents And Short Term Investments']
        self.n = n
        self.tso = tso

    def calculate(self): 
        sumOfDcf = 0
        dcf = 0
        termVal = 0
        discTermVal = 0; 
        for i in range(self.n):    
            self.fcf = self.fcf * (self.growth_rate + 1)
            dcf = self.fcf / ((1 + self.dr) ** (i + 1))
            sumOfDcf = dcf + sumOfDcf
        termVal = self.fcf * self.p2fcf
        discTermVal = termVal / ((1 + self.dr) ** self.n)
        value = (sumOfDcf + discTermVal) / self.tso
    
        e_value = get_enterprise_value(self.market_cap, self.balance_sheet, self.csms)/self.tso
        return [str(round(value, 3)), str(round(e_value, 3))]
    
    def get(request):
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

        return DCFEnterprise(cash_flow, 
                            balance_sheet, 
                            float(dr), 
                            float(growth_rate), 
                            int(n), 
                            tso, 
                            market_cap).calculate()