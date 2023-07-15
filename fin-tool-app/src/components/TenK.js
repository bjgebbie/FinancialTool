import React, { Component } from 'react';
import '../models/DCF';
import DCF from '../models/DCF';
//65824 ocf
//12734 mce
//67155 csms
//22001 tso
export default class TenK extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            ocf: '',
            dr: '',
            mce: '',
            p2fcf: '',
            growthRate: '',
            n: '',
            csms: '',
            tso: '1',
        };
    
        this.handleOcfChange = this.handleOcfChange.bind(this);
        this.handleDrChange = this.handleDrChange.bind(this);
        this.handleMceChange = this.handleMceChange.bind(this);
        this.handleP2fcfChange = this.handleP2fcfChange.bind(this);
        this.handleGrowthRateChange = this.handleGrowthRateChange.bind(this);
        this.handleNChange = this.handleNChange.bind(this);
        this.handleCsmsChange = this.handleCsmsChange.bind(this);
        this.handleTSOChange = this.handleTSOChange.bind(this);
      }
    
      handleOcfChange(event) {
        this.setState(
            {
                ocf: event.target.value,
            }
        );
      }

      handleMceChange(event) {
        this.setState(
            {
                mce: event.target.value,
            }
        );
      }

      handleDrChange(event) {
        this.setState(
            {
                dr: event.target.value,
            }
        );
      }
    
      handleP2fcfChange(event) {
        this.setState(
            {
                p2fcf: event.target.value,
            }
        );
      }

      handleGrowthRateChange(event) {
        this.setState(
            {
                growthRate: event.target.value,
            }
        );
      }

      handleNChange(event) {
        this.setState(
            {
                n: event.target.value,
            }
        );
      }

      handleCsmsChange(event) {
        this.setState(
            {
                csms: event.target.value,
            }
        );
      }

      handleTSOChange(event) {
        this.setState(
            {
                tso: event.target.value,
            }
        );
      }

      render() {
        return (
            <div>
                <form>
                    <div className="form-group" >
                        <p>Operating Cash Flow: <input type="text" value={this.state.ocf} onChange={this.handleOcfChange} /></p>
                        <p>Discount Rate: <input type="text" value={this.state.dr} onChange={this.handleDrChange} /></p>
                        <p>Maintenance Capital Expenditure: <input type="text" value={this.state.mce} onChange={this.handleMceChange} /></p>
                        <p>Price to FCF: <input type="text" value={this.state.p2fcf} onChange={this.handleP2fcfChange} /></p>
                        <p>Growth Rate: <input type="text" value={this.state.growthRate} onChange={this.handleGrowthRateChange} /></p>
                        <p>How many years: <input type="text" value={this.state.n} onChange={this.handleNChange} /></p>
                        <p>Cash and short-term: <input type="text" value={this.state.csms} onChange={this.handleCsmsChange} /></p>
                        <p>Total Shares Outstanding <input type="text" value={this.state.tso} onChange={this.handleTSOChange} /></p>                
                    </div>
                    <div>
                        {new DCF(
                                Number(this.state.ocf), 
                                Number(this.state.mce),
                                Number(this.state.dr),
                                Number(this.state.p2fcf),
                                Number(this.state.growthRate),
                                Number(this.state.csms),
                                Number(this.state.n),
                                Number(this.state.tso)).calculate().toString()}
                    </div>
                </form>
            </div>
          
        );
      }
}