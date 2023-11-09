import './Inventory.scss'

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

    if(!inventories) {
        return (<div>Loading</div>)
    }

    return (
        <main>
            <section>
                <h1>Inventories</h1>
                {
                    inventories.map((item) => <InventoryListItem key={item.id} item={item}/>)
                }
            </section>
        </main>
    );
}

export default Inventory;
