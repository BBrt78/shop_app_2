import './App.css';
import React from "react";
import {DeviceMobile, Laptop, Watch, Cpu} from "phosphor-react";
import {Link} from "react-router-dom";

export function Menu() {
    return (
        <div className="menu" >
            <Link to="/smartfony"><span className="link1 link"><DeviceMobile size={20} className="icon1" /> Smartfony</span></Link>
            <Link to="/smartwatche"><span className="link2 link"><Watch size={20} className="icon2" /> Smartwatche</span></Link>
            <Link to="/laptopy"><span className="link3 link"><Laptop size={20} className="icon3" /> Laptopy</span></Link>
            <Link to="/podzespoly"><span className="link4 link"><Cpu size={20} className="icon4" /> Podzespoły komputerowe</span></Link>
        </div>
    )
}