export default class DCF {
    /**
     * ocf: operating cash flow 
     * dr: discount rate (return you want to achieve)
     * p2fcf: price to free cash flow (rn cvs is 5.24 need to make function to calculate this number later)
     * growth: growth rate of the company
     * mce: maintenance capital expenditure (AKA properties, plant and equipment)
     * n: how many years we are we are discounting into the future
     * csms: cash and short-term marketable securities
     * tso: total shares outstanding
     * 
     * Model:
     *  1. Calculate Free Cash Flow (fcf) which is ocf - mce
     *  2. Apply growth rate for each year until n years have been applied, this gives tv (Terminal Value)
     *  3. Multiply tv by p2fcf
     *  4. Calculate dcf by using sum(fcf / ((1 + dr)^i) )  
     *  5. Add csms to dcf
     *  6. dcf / total shares outstanding yields fair price
     */
    constructor(ocf, mce, dr, p2fcf, growthRate, csms, n, tso) {
        this.ocf = ocf;
        this.mce = mce;
        this.dr = dr;
        this.p2fcf = p2fcf;
        this.growthRate = growthRate;
        this.csms = csms;
        this.n = n;
        this.tso = tso;
    }

    calculate() {
        let fcf = this.ocf - this.mce;
        let sumOfDcf = 0;
        let dcf = 0;
        let termVal = 0;
        let discTermVal = 0; 
        for (let i = 1; i <= this.n; i++) {
            
            fcf = fcf * (this.growthRate + 1);
            dcf = (fcf / Math.pow(1 + this.dr, i)); 
            sumOfDcf = dcf + sumOfDcf;

        }

        termVal = fcf * this.p2fcf;
        discTermVal = termVal / Math.pow(1 + this.dr, this.n)

        return (sumOfDcf + discTermVal + this.csms) / this.tso;
    }
    
}