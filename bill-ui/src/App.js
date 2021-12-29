import React from 'react';
import './App.css';
import HomePage from './components/homepage';
import Customer from './components/Customer';
import ProductPage from './components/ProductPage';
import BillingPage from './components/BillingPage';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import NavBar from './components/NavBar';

function App() {
  return (
    <div >
      
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/customer" element={<Customer/>}></Route>
        <Route path="/product" element={   <ProductPage />}></Route>
        <Route path="/bill" element={<BillingPage />}></Route>
      </Routes>
      </BrowserRouter>    
    </div>
  );
}

export default App;
