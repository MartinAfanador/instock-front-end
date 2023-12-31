import './Header.scss';
import Logo from '../../images/logo/InStock-Logo_1x.png';
import { NavLink } from 'react-router-dom';


function Header() {

    return (
        <section className='header'>
            <div className='header__layout'>
                <img src={Logo} alt="2 indigo arrows with INSTOCK text in white color" className='header__logo' />
                <div className='header__button-layout'>
                    <NavLink to='/warehouses' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--warehouses"}>Warehouses</NavLink>
                    <NavLink to='/inventories' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--inventory"}> Inventory</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Header;