import style from './Nav.module.css'
import { CartContext } from '../context/ConText'
import { useContext, useState } from 'react'
import CartProduct from '../cartProduct/CartProduct'

export default function Nav() {
    const cart = useContext(CartContext)
    const [cartVisibility, setCartVisibility] = useState(false)

    const productCounts = cart.items.reduce((sum, current) => sum + current.quantity, 0)

    return (
        <>
            <div className='container-p'>
                <div className={style.navbar}>
                    <button onClick={() => setCartVisibility(!cartVisibility)} className='btn'>
                        Cart
                        <i className="fa fa-shopping-cart"></i>
                        {productCounts > 0 && <span>({productCounts})</span>}
                    </button>
                </div>
            </div>
            <div className={style.cartContainer}>
                <div style={{ right: cartVisibility && '0px' }} className={style.cart}>
                    <div className={style.cartHeader}>
                        <h3>Cart</h3>
                        <i onClick={() => setCartVisibility(!cartVisibility)} className="fa fa-times"></i>
                    </div>
                    <div className={style.cartBody}>
                        {
                            productCounts > 0 ?
                                cart.items.map(item => (
                                    <CartProduct key={item.id} id={item.id} quantity={item.quantity} />
                                    ))
                                    :
                                    <div className={style.emptyCart}>
                                <h3>Your shopping cart is empty</h3>
                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                            </div>
                        }
                    </div>
                        {productCounts > 0 && <h3>Total: ${cart.getTotalAmount()}</h3>}
                </div>
            </div>
        </>
    )
}