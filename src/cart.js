import './App.css';
import React, {useContext, useState} from "react";
import {Navbar} from "./navbar.js";
import {CartContext} from "./cartProvider.js";
import {List} from "./list.js";

export function Cart() {
    const {cartList, setCartList} = useContext(CartContext);
    const {idCart, setIdCart} = useContext(CartContext);
    const {sameItemQ, setSameItemQ} = useContext(CartContext);
    const {cartItemPriceF, setCartItemPriceF} = useContext(CartContext);

const deleteAll = () => {
    //localStorage.removeItem("cartList");
    setCartList([]);
    setCartList([]);
    setIdCart(1);
    setCartItemPriceF(0)
    setSameItemQ(1)
};
console.log("sameItemQ", sameItemQ, cartList)
const deleteThis = (idCart) => {
    setCartList(prevCartList => prevCartList.filter(item => item.idCart !== idCart));
    localStorage.removeItem(`cartList.${idCart}`);
};

const changeSameItemQ = (sign, item) => {
    if ((sign === "-" && item.sameItemQ > 1) || (sign === "+" && item.sameItemQ > 0)) {
        let newSameItemQ;
        if (sign === "-") {
            newSameItemQ = item.sameItemQ - 1;
            setSameItemQ(item.sameItemQ - 1);
        } else if (sign === "+") {
            newSameItemQ = item.sameItemQ + 1;
            setSameItemQ(item.sameItemQ + 1);
        }
        const newCartList = cartList.map(cartItem => {
            if (cartItem.idCart === item.idCart){
                setCartItemPriceF(item.sameItemQ * item.productPrice);
                return {...cartItem, sameItemQ: newSameItemQ}
            } else {
                return cartItem;
            }
        })
        setCartList(newCartList);
    }
}

    //console.log("cartList",cartList, "pricef", cartItemPriceF)
    //console.log(localStorage)
    return (
        <div className="contCart">
            <Navbar />
            <span className="polecamy">{cartList.length !== 0 ? 
                <span>Twój koszyk:</span> 
                : 
                <span>Twój koszyk jest pusty</span>}
            </span>
            <div className="cartDiv">
                {cartList.map(item => (
                    <div className="cartItem" key={item.idCart}>
                        <div className="imgDiv"><img className="cartImg" src={require(`./img/${item.productImg}`)} alt="img" /></div>
                        <div className="cartItemName">{item.productName}</div>
                        <div className="cartItemPrice">Za sztukę: {item.productPrice} zł</div>
                        <div className="cartItemPriceF">Razem: {item.sameItemQ === 1 ? item.productPrice : item.cartItemPriceF} zł</div>
                        <div className="cartItemQ">
                            <span className="cartMinus" onClick={() => {changeSameItemQ("-", item)}}>-</span>
                            <span className="itemQNo">{item.sameItemQ}</span>
                            <span className="cartPlus" onClick={() => {changeSameItemQ("+", item)}}>+</span>
                        </div>
                        <div className="deleteThis" onClick={() => {deleteThis(item.idCart)}}>Usuń</div>
                    </div>
                ))}
            </div>
            <div className="cartDeleteItems" onClick={deleteAll}>Usuń wszystko</div>
        </div>
    )
}