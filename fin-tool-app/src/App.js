import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Analysis from './pages/Analysis/Analysis';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route
                    index
                    path='/'
                    element={<Home/>}
                />
                <Route
                    path='/Analysis'
                    element={<Analysis/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
