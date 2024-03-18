import style from './Product.module.css';
import { CartContext } from '../context/ConText';
import { useContext } from 'react';

export default function Product({ product }) {

    const cart = useContext(CartContext)
    const quantity = cart.getProductQuantity(product.id)

    return (
        <div className={style.product}>
            <div className={style.productImg}>
                <img src={product.image} />
            </div>
            <div className={style.productBodyDetails}>
                <div className={style.productDetails}>
                    <h4>{product.name}</h4>
                    <h5>Price: ${product.price}</h5>
                </div>
                {quantity > 0 ?
                    <div className={style.productQuantity}>
                        <span><b>quantity</b>: {quantity}</span>
                        <div>
                            <button onClick={() => { cart.removeItemFromCart(product.id) }} className='btn'>-</button>
                            <button onClick={() => { cart.addItemToCart(product.id) }} className='btn'>+</button>
                            <i onClick={() => cart.deleteFromCart(product.id)} className={`fa fa-trash ${style.trash}`} aria-hidden="true"></i>
                        </div>
                    </div>
                    :
                    <button onClick={() => { cart.addItemToCart(product.id) }} className={`btn ${style.addToCatBtn}`}>Add to cart</button>
                }
            </div>
        </div>
    )
}