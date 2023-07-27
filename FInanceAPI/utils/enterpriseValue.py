def get_enterprise_value(market_cap, balance_sheet, csms):
    return market_cap + balance_sheet['Total Debt'] - csms 