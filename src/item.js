import './App.css';
import React, {useState, useContext} from "react";
import {Route, Routes, Link, useNavigate} from "react-router-dom";
import {CartContext} from "./cartProvider.js";

export function Item({id, productName, productImg, productPrice, productPriceFull, quantity, productDescription}) {
    const navigate = useNavigate();
    const {cartList, setCartList} = useContext(CartContext);
    //const {idCart, setIdCart} = useContext(CartContext);
    
    function showSingle() {
        navigate(`/products/${id}`);
    };

    function addToCart() {
        const itemIndex = cartList.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const newCartList = [...cartList];
            newCartList[itemIndex] = {...newCartList[itemIndex],
                quantity: cartList[itemIndex].quantity + 1,
                productPriceFull: newCartList[itemIndex].productPrice * (cartList[itemIndex].quantity + 1)
            };
            setCartList(newCartList);
        } else {
            setCartList([...cartList, {id, productName, productPrice, productPriceFull, quantity, productImg}]);
            //setIdCart(idCart + 1);
        }
    };
    
    return (
            <div className="item" >      
                <img src={require(`./img/${productImg}`)} 
                     alt="img" 
                     className="polecamyImg"
                     onClick={showSingle}>
                </img>
                <div className="itemDescription" onClick={showSingle}> 
                    <div className="itemDescriptionTop">{productName}<br /> {productPrice} zł
                    </div>
                    <br />
                    <div className="itemText">{productDescription}</div>
                </div>
                <div className="toCart" onClick={addToCart}>Do koszyka</div>
            </div>
    )
}

