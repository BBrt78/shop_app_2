import React, {createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
    const initialState = JSON.parse(localStorage.getItem("cartList")) || [];
    const [cartList, setCartList] = useState(initialState);
    const [idCart, setIdCart] = useState(1);
    const [sameItemQ, setSameItemQ] = useState(1);
    const [cartListL, setCartListL] = useState(0);
    const [cartItemPriceF, setCartItemPriceF] = useState(0);

    useEffect(() => {
        localStorage.setItem("cartList", JSON.stringify(cartList))
    }, [cartList])

    return (
        <CartContext.Provider value={{
            cartList, setCartList, 
            idCart, setIdCart, 
            sameItemQ, setSameItemQ, 
            cartListL, setCartListL, 
            cartItemPriceF, setCartItemPriceF
            }}>
            {children}
        </CartContext.Provider>
    )

};