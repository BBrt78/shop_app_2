import './App.css';
import React from "react";
import {Home} from "./home";
import {Route, Routes, Link, useParams} from "react-router-dom";
import {Smartfony} from "./smartfony";
import {Smartwatche} from "./smartwatche";
import {Laptopy} from "./laptopy";
import {Podzespoly} from "./podzespoly";
import {Cart} from "./cart";
import {Item} from "./item";
import {SingleProduct} from "./singleProduct";
import {CartProvider} from "./cartProvider.js"

function App() {
  
  return (
    <div> 
          <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smartfony" element={<Smartfony />} />
            <Route path="/smartwatche" element={<Smartwatche />} />
            <Route path="/laptopy" element={<Laptopy />} />
            <Route path="/podzespoly" element={<Podzespoly />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="products/:productId" element={<SingleProduct />} />
          </Routes>
          </CartProvider>
    </div>
  );
}

export default App;
