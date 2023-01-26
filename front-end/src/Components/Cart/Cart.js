import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    return (
        <div>
            <h1>Cart</h1>
            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your Cart Is Currently Empty</p>
                    <div className="start-shopping">
                        <Link to='/' />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                        </svg>

                        <span>Start Shopping</span>
                    </div>
                </div>
            ) : (<div>
                <div className="titles">
                    <h3 className="product-title">Title</h3>
                    <h3 className="price">Price</h3>
                    <h3 className="quantity">Quantity</h3>
                    <h3 className="total">Total</h3>
                </div>
                <div className="cart-items">
                    {cart.cartItems?.map(cartItem =>
                        <div className="cart-item" key={cartItem.id}>
                            <div className="cart-product">
                                <img src={cartItem.image} alt={cartItem.name} />
                                <div className="">
                                    <h3>{cartItem.name}</h3>
                                    <p>{cartItem.desc}</p>
                                    <button>Remove</button>
                                </div>


                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
    );
};

export default Cart