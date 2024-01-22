import './App.css';
import React from "react";
import {Navbar} from "./navbar.js";
import {List} from "./list.js"
import {Item} from "./item.js"

export function Smartwatche() {
    const filterList = List.filter(item => item.category === "smartwatch")

    return (
        <div className="container">
            <Navbar />
            <div className="items smartwatche">
            
                {filterList.map(item => (
                    <Item 
                        id={item.id}
                        key={item.id} 
                        productName={item.productName}
                        productImg={item.productImg}
                        productPrice={item.productPrice}
                        productDescription={item.productDescription} />
                ))}
            </div>
        </div>
    )
}