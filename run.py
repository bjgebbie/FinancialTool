import yfinance as yf

def main():
    data = yf.Ticker('de')
    print(data.balance_sheet)

if __name__ == '__main__':
    main()