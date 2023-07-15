import React from 'react'
import './App.css';
import TenK from './components/TenK';
import 'yahoo-finance';
import Units from './components/Units';

function App() {

  return (
    <div className="Info" style={{textAlign: "center"}}>
      <TenK /> 
      <Units />
    </div>
  );
}

export default App;
