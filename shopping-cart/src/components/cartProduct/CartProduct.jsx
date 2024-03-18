import { getProductData } from '../../data/items'
import style from './CartProduct.module.css'
import { CartContext } from '../context/ConText'
import { useContext } from 'react'

export default function CartProduct({id, quantity}) {

    const cart = useContext(CartContext)

    const productData = getProductData(id)
    
    return (
        <div className={style.cartProduct}>
            <div className={style.cartProductDetails}>
                <p>Name</p>
                <span><b>quantity: </b>{quantity}</span>
                <span><b>price: </b>${productData.price * quantity}</span>
                <button onClick={() => cart.deleteFromCart(id)} className={`btn ${style.removeBtn}`}>remove</button>
            </div>
            <div className={style.cartProductImg}>
                <img src={productData.image} />
            </div>
        </div>
    )
} 