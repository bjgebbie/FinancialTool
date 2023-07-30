import yfinance as yf

def main():
    data = yf.Ticker('CVS')
    print(data)

if __name__ == '__main__':
    main()