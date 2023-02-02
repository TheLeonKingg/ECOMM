import React from 'react'
import "./cart.css";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { removeFromCart, decreaseCartQuantity, addToCart, clearCart, getTotal } from '../../features/cartSlice';


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotal())
    }, [Cart, dispatch])

    const handleRemoveFromCart = (cartItems) => {
        dispatch(removeFromCart(cartItems));
    }
    const handleDecreaseCart = (cartItems) => {
        dispatch(decreaseCartQuantity(cartItems));
    }
    const handleIncreaseCart = (cartItems) => {
        dispatch(addToCart(cartItems));
    }
    const handleEmptyCart = () => {
        dispatch(clearCart());
    }







    return (
        <div className="cart-container">

            <h2>Shopping Cart</h2>

            {cart.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    <div className="start-shopping">
                        <Link to="/">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                />
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart.cartItems &&
                            cart.cartItems.map((cartItem) => (
                                <div className="cart-item" key={cartItem._id}>
                                    <div className="cart-product">
                                        <img src={cartItem.image} alt={cartItem.name} />
                                        <div>
                                            <h3>{cartItem.name}</h3>
                                            <p>{cartItem.desc}</p>
                                            <button onClick={() => handleRemoveFromCart(cartItem)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">Rs {cartItem.price}</div>
                                    <div className="cart-product-quantity">
                                        <button onClick={() => handleDecreaseCart(cartItem)} >
                                            -
                                        </button>
                                        <div className="count">{cartItem.cartQuantitiy}</div>
                                        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                    </div>
                                    <div className="cart-product-total-price">
                                        Rs {cartItem.price * cartItem.cartQuantitiy}
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="cart-summary">
                        <button onClick={() => handleEmptyCart()}>
                            Clear Cart
                        </button>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span className="amount">Rs {cart.cartTotalAmount}</span>
                            </div>
                            <p>Taxes and shipping calculated at checkout</p>
                            <button>Check out</button>
                            <div className="continue-shopping">
                                <Link to="/">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-arrow-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                        />
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;