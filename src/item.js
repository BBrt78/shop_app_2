import './App.css';
import React, {useState, useContext} from "react";
import {Route, Routes, Link, useNavigate} from "react-router-dom";
// import {List} from "./list.js";
// import {SingleProduct} from "./singleProduct";
import {CartContext} from "./cartProvider.js";

export function Item({id, productName, productImg, productPrice, productDescription}) {
    const navigate = useNavigate();
    const {cartList, setCartList} = useContext(CartContext);
    const {idCart, setIdCart} = useContext(CartContext);
    const {sameItemQ, setSameItemQ} = useContext(CartContext);
    const {cartItemPriceF, setCartItemPriceF} = useContext(CartContext);

    function showSingle() {
        navigate(`/products/${id}`);
    };

    function addToCart() {
        const itemIndex = cartList.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            const newCartList = [...cartList];
            newCartList[itemIndex] = {...newCartList[itemIndex],
                sameItemQ: newCartList[itemIndex].sameItemQ + 1,
                cartItemPriceF: (newCartList[itemIndex].sameItemQ + 1) * newCartList[itemIndex].productPrice
            };
            setSameItemQ(newCartList[itemIndex].sameItemQ)
            setCartItemPriceF((newCartList[itemIndex].sameItemQ) * newCartList[itemIndex].productPrice);
            setCartList(newCartList);
        } else {
            setCartList([...cartList, {id, idCart, sameItemQ, cartItemPriceF: productPrice, productName, productImg, productPrice, productDescription}]);
            setIdCart(idCart + 1);
            setCartItemPriceF(productPrice);
            console.log(cartList)
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

