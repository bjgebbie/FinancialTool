from utils.enterpriseValue import get_enterprise_value

class DCFEnterprise:
    def __init__(self, cash_flow, balance_sheet, dr, growth_rate, n, tso, market_cap):
        self.cash_flow = cash_flow[list(cash_flow)[0]]
        self.balance_sheet = balance_sheet[list(balance_sheet)[0]]
        self.ocf = self.cash_flow['Operating Cash Flow']
        self.mce = self.cash_flow['Net PPE Purchase And Sale']
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