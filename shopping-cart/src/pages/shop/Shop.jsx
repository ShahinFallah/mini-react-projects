import style from './Shop.module.css';
import Nav from '../../components/navbar/Nav';
import Product from '../../components/product/Product';
import { productList } from '../../data/items';

export default function Shop() {
    return (
        <>
            <Nav />
            <div className='container-p'>
                <div className={style.productWrapper}>
                    {
                        productList.map(data => (
                            <Product key={data.id} product={data} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}