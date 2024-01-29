import './App.css';
import React, {useContext, useState} from "react";
import {Navbar} from "./navbar.js";
import {CartContext} from "./cartProvider.js";
import {List} from "./list.js";

export function Cart() {
    const {cartList, setCartList} = useContext(CartContext);
    const [cartPrice, setCartPrice] = useState;

    const deleteAll = () => {
        localStorage.removeItem("cartList")
        setCartList([]);
        // setIdCart(1);
    };

    const deleteThis = (id) => {
        setCartList(prevCartList => prevCartList.filter(item => item.id !== id));
        localStorage.setItem(`cartList.${id}`, JSON.stringify([]));
    };

    const changeQuantity = (sign, item) => {
        if ((sign === "-" && item.quantity > 1) || (sign === "+" && item.quantity > 0)) {
            let newQuantity;
            if (sign === "-") {
                newQuantity = item.quantity - 1;
            } else if (sign === "+") {
                newQuantity = item.quantity + 1;
            }
            const newCartList = cartList.map(cartItem => {
                if (cartItem.id === item.id){
                        return {...cartItem, 
                                quantity: newQuantity,
                                productPriceFull: newQuantity * item.productPrice}
                    } else {
                        return cartItem;
                    }})
            setCartList(newCartList);
        }}

        setCartPrice(cartList.reduce())

    return (
        <div className="contCart">
            <Navbar />
            <div className="cartText">{cartList.length !== 0 ? 
                <span>Twój koszyk:</span> 
                : 
                <span>Twój koszyk jest pusty</span>}
            </div>
            <span className="cartPriceText">{cartPrice}</span>
            <div className="cartDiv">
                {cartList.map(item => (
                    <div className="cartItem" key={item.idCart}>
                        <div className="imgDiv"><img className="cartImg" src={require(`./img/${item.productImg}`)} alt="img" /></div>
                        <div className="cartItemName">{item.productName}</div>
                        <div className="cartItemPrice">Za sztukę: {item.productPrice} zł</div>
                        <div className="fullPrice">Razem: {item.productPriceFull} zł</div>
                        <div className="cartItemQ">
                            <span className="cartMinus" onClick={() => {changeQuantity("-", item)}}>-</span>
                            <span className="itemQNo">{item.quantity}</span>
                            <span className="cartPlus" onClick={() => {changeQuantity("+", item)}}>+</span>
                        </div>
                        <div className="deleteThis" onClick={() => {deleteThis(item.id)}}>Usuń</div>
                    </div>
                ))}
            </div>
            <div className="cartDeleteItems" onClick={deleteAll}>Usuń wszystko</div>
        </div>
    )
}