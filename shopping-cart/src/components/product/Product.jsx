import style from './Product.module.css';

export default function Product({url}) {
    return(
        <div className={style.product}>
            <div className={style.productImg}>
                <img src={url} />
            </div>
            <div className={style.productBodyDetails}>
                <div className={style.productDetails}>
                    <h4>Phone</h4>
                    <h5>Price: $199</h5>
                </div>
                <button className='btn'>Add to cart</button>
            </div>
        </div>
    )
}