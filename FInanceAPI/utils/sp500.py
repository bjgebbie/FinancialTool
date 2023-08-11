import pandas as pd

def getSp500Companies():
    sp500_url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_table = pd.read_html(sp500_url)[0]
    sp500_tickers = sp500_table['Symbol'].tolist()

    return sp500_tickers