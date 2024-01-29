import './App.css';
import React, {useState, useContext} from "react";
import {useParams} from "react-router-dom";
import {List} from "./list.js";
import {Navbar} from "./navbar.js";
import {CartContext} from "./cartProvider.js";

export function SingleProduct() {
    const {productId} = useParams();
    const singleProduct = List.find(product => product.id === parseInt(productId));
    const {id, productName, productPrice, productPriceFull, quantity, productImg, productDescription, productSpecs} = singleProduct;
    let fullDate = "";
    const [input, setInput] = useState("");
    const [name, setName] = useState("");
    const {cartList, setCartList} = useContext(CartContext);
    //const [idCart, setIdCart] = useState(1);
    
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

    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem(`comments_${id}`);
        if (savedComments) {
            return JSON.parse(savedComments)
        } else {
            return []
        }
    });

    const handleChange = (event) => {
        setInput(event.target.value)
    };
    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleAddComment = () => {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
            fullDate = `${hour}:${minute} ${day}.${month}.${year}`;
                if(input) {
                    const newComment = {text: input, date: fullDate, name: name};
                    const newComments = [...comments, newComment];
                    setComments(newComments);
                    localStorage.setItem(`comments_${id}`, JSON.stringify(newComments));
                    setInput("");
                    setName("");
                }
        };

    const clearLocal = () => {
        localStorage.removeItem(`comments_${id}`);
        setComments([])
    };
    
    return (
        <div className="singleProductContainer" >
            <Navbar />
            <div className="singleProduct">
                <img src={require(`./img/${productImg}`)}
                     alt="img"
                     className="singleProductImg">
                </img>
            
                <div className="singleProductDesc">
                    <span className="singleProductName">{productName}</span>
                        <div className="rowInDesc">
                        <span className="singleProductPrice">{productPrice} zł</span>
                        <span className="singleToCart" onClick={addToCart}>Do koszyka</span>
                        </div>
                    <div className="singleProductDescription">
                    {productDescription}
                    </div>
                
                    <div className="singleProductSpecs">
                        <span>{productSpecs.a}</span><br />
                        <span>{productSpecs.b}</span><br />
                        <span>{productSpecs.c}</span>
                    </div>
                </div>
                
                <div className="comments">
                    <p className="commentsTitle">Opinie:</p>
                    <input className="inputName" onChange={handleName} value={name} placeholder="Twoje imię lub pseudonim"></input>
                    <textarea className="input" onChange={handleChange} value={input} placeholder="Twoja opinia"></textarea>
                    <button className="addComment" onClick={handleAddComment}>Dodaj</button>
                    
                    <div className="commentsList" >
                        {comments.map((comment, index) => {
                            return <div className="singleComment" key={index}>
                                   <span className="nameDate">{comment.name} {comment.date}</span>
                                   <br /><br /> {comment.text}
                                   </div>
                        })}
                    </div>
                </div>  
                <button className="clearComments" onClick={clearLocal}>Usuń komentarze</button>
            </div>
        </div>
    )
}