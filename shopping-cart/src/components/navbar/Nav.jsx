import style from './Nav.module.css'

export default function Nav() {
    return (
        <div className='container-p'>
            <div className={style.navbar}>
                <button className='btn'>
                    Cart
                    <i className="fa fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    )
}