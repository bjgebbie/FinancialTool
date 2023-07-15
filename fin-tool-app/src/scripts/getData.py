import yfinance as yf

def main():
    msft = yf.Ticker("MSFT")
    print(msft.cashflow)

if __name__ == '__main__':
    main()