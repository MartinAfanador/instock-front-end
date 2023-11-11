import './Header.scss';
import Logo from '../../images/logo/InStock-Logo_1x.png';
import { NavLink } from 'react-router-dom';

function Header() {

    return (
        <section className='header'>
            <div className='header__layout'>
                <img src={Logo} alt="Logo" className='header__logo' />
                <div className='header__button-layout'>
                    <NavLink to='/' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--warehouses"}>Warehouses</NavLink>
                    <NavLink to='/inventories' className={({ isActive }) => isActive ? "header__button header__button--active" : "header__button header__button--inventory"}> Inventory</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Header;