from .sp500 import getSp500Companies
from models.dcf import DCF
import threading

def Top20(request):
    companiesTickers = getSp500Companies()
    batch_output = []
        
    growth_rate = request.args.get('growthRate')
    dr = request.args.get('dr')
    n = request.args.get('n')

    number_batches = 100
    batch_size = int(len(companiesTickers) / number_batches)
    threads = []
    print('calculating: ')
    for i in range(number_batches):
        fh = batch_size * i
        bh = batch_size * (i + 1) 
        threads.append(threading.Thread(target=batch, args=[growth_rate, dr, n, batch_output, companiesTickers[ fh: bh]]))

    for thread in threads:
        thread.start()
    
    for thread in threads:
        thread.join()

    sorted_batch_output = sorted(batch_output, key=lambda x: x[1])
    print (sorted_batch_output[-20:])
    return '[tickerDcfOutputPair]'

def batch(growth_rate, dr, n, batch_output, batch_set):
    for ct in batch_set:
        formated_ct = ct.replace('.', '-')
        if ct != 'ULTA':
            value = float(DCF.get(growth_rate, dr, n, symbol=formated_ct)[1])
            market_value = float(DCF.get(growth_rate, dr, n, symbol=formated_ct)[0])
            batch_output.append((formated_ct, value / market_value))