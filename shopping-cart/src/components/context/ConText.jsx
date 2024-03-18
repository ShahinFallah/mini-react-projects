import { createContext, useState } from "react";
import { getProductData } from "../../data/items";

const CartContext = createContext({
    items: [],
    getProductQuantity: () => { },
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    deleteFromCart: () => { },
    getTotalAmount: () => { }
})

const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    const getProductQuantity = id => {
        let quantity = cartProducts.find(item => item.id === id)?.quantity
        return quantity = quantity == undefined ? 0 : quantity
    }

    const addItemToCart = id => {

        const quantity = getProductQuantity(id)

        if (quantity === 0) {
            setCartProducts(prevState => (
                [...prevState, { id: id, quantity: 1 }]
            ))
        } else {
            setCartProducts(
                cartProducts.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
            )
        }
    }

    const deleteFromCart = id => {
        setCartProducts(cartProducts.filter(item => {
            return item.id != id;
        }))
    }

    const removeItemFromCart = id => {
        const quantity = getProductQuantity(id)

        if (quantity <= 1) {
            deleteFromCart(id)
        }
        else {
            setCartProducts(cartProducts.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 }:item))
        }
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        cartProducts.map(item => {
            const productData = getProductData(item.id)

            totalAmount += productData.price * item.quantity
        })
        return totalAmount;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addItemToCart,
        removeItemFromCart,
        deleteFromCart,
        getTotalAmount
    }
    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}

export { CartContext, CartProvider }