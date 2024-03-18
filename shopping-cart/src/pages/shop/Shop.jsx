import style from './Shop.module.css';
import Nav from '../../components/navbar/Nav';
import Product from '../../components/product/Product';

export default function Shop() {
    return (
        <>
            <Nav />
            <div className='container-p'>
                <div className={style.productWrapper}>
                    <Product url = 'assets/images/Products/product1.jpg' />
                    <Product url = 'assets/images/Products/product2.jpg' />
                    <Product url = 'assets/images/Products/product3.jpg' />
                    <Product url = 'assets/images/Products/product4.jpg' />
                    <Product url = 'assets/images/Products/product5.jpg' />
                    <Product url = 'assets/images/Products/product6.jpg' />
                    <Product url = 'assets/images/Products/product7.jpg' />
                    <Product url = 'assets/images/Products/product8.jpg' />
                </div>
            </div>
        </>
    )
}