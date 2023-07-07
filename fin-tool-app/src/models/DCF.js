export default class DCF {
    /**
     * ocf: operating cash flow
     * dr: discount rate (return you want to achieve)
     * p2fcf: price to free cash flow (rn cvs is 5.24 need to make function to calculate this number later)
     * growth: growth rate of the company
     * mce: maintenance capital expenditure (AKA properties, plant and equipment)
     * n: how many years we are we are discounting into the future
     * csms: cash and short-term marketable securities
     * 
     * Model:
     *  1. Calculate Free Cash Flow (fcf) which is ocf - mce
     *  2. Apply growth rate for each year until n years have been applied, this gives tv (Terminal Value)
     *  3. Multiply tv by p2fcf
     *  4. Calculate dcf by using sum(fcf / ((1 + dr)^i) )  
     *  5. Add csms to dcf
     *  6. dcf / total shares outstanding yields fair price
     */
    constructor(ocf, dr, p2fcf, growth, mce, csms, n) {
        this.ocf = ocf;
        this.dr = dr;
        this.p2fcf = p2fcf;
        this.growth = growth;
        this.mce = mce;
        this.csms = csms;
        this.n = n;
    }

    calculate() {
        let fcf = this.ocf - this.mce;
        let fcfList = []
        for (let i = 0; i < this.n; i++) {
            fcf = fcf * growth;
            fcfList.push(fcf);
        }
        const tv = fcf * this.p2fcf;
    }
    
}