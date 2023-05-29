import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import Create from './components/pages/Create';
import Edit from './components/pages/Edit';

import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/edit/:id' element={<Edit />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
