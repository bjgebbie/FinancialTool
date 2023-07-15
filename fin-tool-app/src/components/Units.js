import React, { Component } from 'react';
import axios from 'axios';



export default class Units extends Component{

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleOpen = this.handleOpen.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }
  
  setOpen = (open) => {
    this.setState({open: open});
  }
  getCashFlow = async () => {
    const url = 'http://127.0.0.1:5000/Dcf?symbol=CVS';
    let response = await axios({
      method: 'get',
      url: url,
    });
    console.log(JSON.parse(response.data));
    return response.data;
  }



  handleOpen = () => {
    this.getCashFlow();
    
    this.setOpen(!this.state.open);
  };
  
  render() {
    return (
      <div>
        <button onClick={this.handleOpen}>Dropdown</button>
        {this.state.open ? (
        <ul className="menu">
            <button onClick={this.handleOpen}>Billions</button>
            <button onClick={this.handleOpen}>Millions</button>
        </ul>
      ) : null}
      </div>
    );
  }
};

