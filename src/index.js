import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
//import pizzaData from './data';

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, arugula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className='container'>
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return <h1 className='header-title'>Wei Qiang’s Pizza Co.</h1>;
}

function Pizza({ img, name, ingredients, price, soldOut }) { // Use consistent prop names
    return (
        <div className='pizza'>
            <img src={img} alt={`${name} pizza`} />
            <div className='content'>
            <h4>{name}</h4>
            <p>{ingredients}</p>
            <p>{soldOut ? "Sold Out" : `$${price}`}</p>
            </div>
        </div>
    );
}

function Filter({ setFilter }) {
    return (
        <div>
            <ul className="fliter-points">
                <li onClick={() => setFilter("all")} >ALL</li>
                <li onClick={() => setFilter("available")} >Available</li>
                <li onClick={() => setFilter("soldOut")}>Sold Out</li>
            </ul>
        </div>
    );
}

function Menu() {
    const [filter, setFilter] = useState("all");

    // Filter pizza data based on selected filter
    const filteredPizzaData = pizzaData.filter(pizza => {
        if (filter === "available") {
            return !pizza.soldOut;
        } else if (filter === "soldOut") {
            return pizza.soldOut;
        } else{
            return true;
        }
    });

    const pizzaList = filteredPizzaData.map((pizza) => (
        <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            img={pizza.photoName}
            soldOut={pizza.soldOut}
        />
    ));

    return (
        <div className='menu'>
            <h2>Our Menu</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <div className='pizzas'>
                {pizzaList}
            </div>
        </div>
    );
}


function Order() {
    const timeNow = new Date().getHours();
    return (
        <div>
            {timeNow >= 10 && timeNow < 22 ? <p className='btn order'>Order</p> : ""}
        </div>
    );
}
function Footer() {
    const timeNow = new Date().getHours();
    return (
        <footer className='footer'>
            {timeNow >= 10 && timeNow < 22 ? "We’re currently open" : "Sorry we’re closed"}
            <Order />
        </footer>
    );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);