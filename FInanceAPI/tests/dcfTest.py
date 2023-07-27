import unittest
from models.dcf import DCF
from models.dcfEnterprise import DCFEnterprise

class DcfTests(unittest.TestCase):
    cash_flow = {
            'e1': {
                'Operating Cash Flow': 65_824_000_000,
                'Net PPE Purchase And Sale': -12_734_000_000,
            }
        }
    balance_sheet = {
            'e1': {
                'Cash Cash Equivalents And Short Term Investments' : 67155000000,
                'Total Debt': 87_030_000_000
            }
        }
    def test_dcf(self):
        
        dcf_results = DCF(
            self.cash_flow,
            self.balance_sheet,
            0.15,           # dr
            0.10,           # gr
            10,             # n
            22_001_000_000, # tso
            608_900_000_000 # market cap
        ).calculate()

        self.assertEqual('39.848', dcf_results) 
        
    def test_dcf_e(self):

        dcf_e_results = DCFEnterprise(
            self.cash_flow,
            self.balance_sheet,
            0.15,           # dr
            0.10,           # gr
            10,             # n
            22_001_000_000, # tso
            608_900_000_000 # market cap
        ).calculate()

        self.assertEqual('36.795', dcf_e_results[0]) 

if __name__ == '__main__':
    unittest.main()