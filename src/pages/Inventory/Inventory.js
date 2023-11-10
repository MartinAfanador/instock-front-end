import './Inventory.scss'

import { ReactComponent as SearchIcon } from './../../images/search_black_24dp.svg';

import axios from 'axios';
import { useState, useEffect } from 'react';
import InventoryListItem from '../../components/InventoryListItem/InventoryListItem';

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
                    <div className='inventories__search-container'>
                        <input className='inventories__input-field' type='text' placeholder='Search...' name='search' />
                        <SearchIcon className='inventories__search-icon' />
                    </div>
                    <button className='inventories__add-button'>+ Add New Item</button>
                </div>
                <div className='inventories__inventory-list'>
                    {
                        inventories.map((item) => <InventoryListItem key={item.id} item={item} />)
                    }
                </div>
            </section>
        </main>
    );
}

export default Inventory;
