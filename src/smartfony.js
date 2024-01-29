import './App.css';
import React from "react";
import {Navbar} from "./navbar.js";
import {List} from "./list.js"
import {Item} from "./item.js"

export function Smartfony() {
    const filterList = List.filter(item => item.category === "smartfon")

    return (
        <div className="container">
            <Navbar />
            <div className="items smartfony">
                {filterList.map(item => (
                    <Item 
                        id={item.id}
                        key={item.id} 
                        productName={item.productName}
                        category={item.category}
                        productPrice={item.productPrice}
                        productPriceFull={item.productPriceFull}
                        quantity={item.quantity}
                        productImg={item.productImg}
                        productDescription={item.productDescription}
                        productSpecs={item.productSpecs} />
                ))}
            </div>
        </div>
    )
}