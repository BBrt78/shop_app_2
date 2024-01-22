import './App.css';
import React, {useState, useContext, useEffect} from "react";
import {ShoppingCart, List} from "phosphor-react";
import {Menu} from "./menu.js";
import {Link} from "react-router-dom";
import logoWhite from "./img/logo-white.png";
import {CartContext} from "./cartProvider.js";

export function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false)
    const setMenu = () => {
        setMenuVisible(!menuVisible)
    }
    const longNav = menuVisible ? "long-nav" : "navbar";
    const {cartList, setCartList} = useContext(CartContext);
    const {cartListL, setCartListL} = useContext(CartContext);

    useEffect(() => {
        let cartLL = cartList.reduce((total, item) => total + item.sameItemQ, 0);
        setCartListL(cartLL);
    }, [cartList, setCartListL])
   
    return (
        <div className={`${longNav}`}>
            <Link to="/"><img src={logoWhite} className="logo" /></Link>
            {menuVisible && <Menu />}
            <List size={32} onClick={setMenu} className="burger" />
            <Link to="/cart"><ShoppingCart size={36} className="cart" />
                <span className="numberInCart">{cartListL}</span>
            </Link>
        </div>
    )
}

