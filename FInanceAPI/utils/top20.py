from .sp500 import getSp500Companies
from models.dcf import DCF

def Top20(request):
    companiesTickers = getSp500Companies()

    i = 0
    tickerDcfOutputPair = []
    # for ct in companiesTickers:
    #     i += 1
    #     print('calculating '+ ct + ' ' + str(i) +'/500')

    #     tickerDcfOutputPair.append([ct, DCF.get(request, symbol=ct)])
    # print(tickerDcfOutputPair)

    return '[tickerDcfOutputPair]'