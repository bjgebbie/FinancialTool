import yfinance as yf

def main():

    # Get the S&P 500 index from yfinance
    sp500 = yf.Ticker('^GSPC')

    # Get the list of components (ticker symbols) in the S&P 500
    sp500_components = sp500.components

    # Extract ticker symbols from the DataFrame
    ticker_symbols = sp500_components.index.tolist()

    print(ticker_symbols)


if __name__ == '__main__':
    main()