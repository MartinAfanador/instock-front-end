import './Inventory.scss'

import { ReactComponent as SearchIcon } from './../../images/search_black_24dp.svg';
import { ReactComponent as UnfoldMoreIcon } from './../../images/unfold_more_black_24dp.svg'

import axios from 'axios';
import { useState, useEffect } from 'react';
import InventoryListItem from '../../components/InventoryListItem/InventoryListItem';
import { Link } from 'react-router-dom';

function Inventory() {

    const [inventories, setInventories] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            const response = await axios.get('http://localhost:8080/api/inventories');
            console.log(response.data);
            setInventories(response.data);
        }

        fetchInventories();

    }, []);

    if (!inventories) {
        return (<div>Loading</div>)
    }

    return (
        <main>
            <section className='inventories'>
                <div className='inventories__header-container'>
                    <h1 className='inventories__heading'>Inventory</h1>
                    <div className='inventories__heading-subcontainer'>
                        <div className='inventories__search-container'>
                            <input className='inventories__input-field' type='text' placeholder='Search...' name='search' />
                            <SearchIcon className='inventories__search-icon' />
                        </div>
                        <Link to={`/add-inventory-item`}><button className='inventories__add-button'>+ Add New Item</button></Link>
                    </div>
                </div>
                <div className='inventories__inventory-list'>
                    <div className='inventories__labels-container'>
                        <div className='inventories__details-container'>
                            <div className='inventories__left-subcontainer'>
                                <div className='inventories__item-container'>
                                    <span className='inventories__label'>INVENTORY ITEM</span>
                                    <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                                </div>
                                <div className='inventories__category-container'>
                                    <span className='inventories__label'>CATEGORY</span>
                                    <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                                </div>
                            </div>
                            <div className='inventories__right-subcontainer'>
                                <div className='inventories__status-container'>
                                    <span className='inventories__label'>STATUS</span>
                                    <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                                </div>
                                <div className='inventories__quantity-container'>
                                    <span className='inventories__label'>QTY</span>
                                    <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                                </div>
                                <div className='inventories__warehouse-container'>
                                    <span className='inventories__label'>WAREHOUSE</span>
                                    <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                                </div>
                            </div>
                        </div>
                        <div className='inventories__buttons-container'>
                            <span className='inventories__label'>ACTIONS</span>
                        </div>
                    </div>
                    {
                        inventories.map((item) => <InventoryListItem key={item.id} item={item} />)
                    }
                </div>
            </section>
        </main>
    );
}

export default Inventory;
