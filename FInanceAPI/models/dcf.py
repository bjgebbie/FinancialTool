''' 
    ocf: operating cash flow 
    dr: discount rate (return you want to achieve)
    p2fcf: price to free cash flow (rn cvs is 5.24 need to make function to calculate this number later)
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
    def __init__(self, cash_flow, balance_sheet, dr, growth_rate, n, tso):
        self.cash_flow = cash_flow[list(cash_flow)[0]]
        self.balance_sheet = balance_sheet[list(balance_sheet)[0]]
        #print(self.balance_sheet)
        self.ocf = self.cash_flow['Operating Cash Flow']
        self.mce = self.cash_flow['Net PPE Purchase And Sale']
        self.dr = dr
        self.p2fcf = 10#self.cash_flow['Operating Cash Flow']
        self.growth_rate = growth_rate
        self.csms = self.balance_sheet['Cash Cash Equivalents And Short Term Investments']
        self.n = n
        self.tso = tso

    def calculate(self): 
        fcf = self.ocf + self.mce
        sumOfDcf = 0
        dcf = 0
        termVal = 0
        discTermVal = 0; 
        for i in range(self.n):            
            fcf = fcf * (self.growth_rate + 1)
            dcf = fcf / ((1 + self.dr) ** (i + 1))
            sumOfDcf = dcf + sumOfDcf
            # print(sumOfDcf)
        termVal = fcf * self.p2fcf
        discTermVal = termVal / ((1 + self.dr) ** self.n)
        
        return str((sumOfDcf + discTermVal + self.csms) / self.tso)