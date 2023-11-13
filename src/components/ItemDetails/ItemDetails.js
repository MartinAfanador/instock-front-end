import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemDetails.scss';
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';
import { useParams, useNavigate } from 'react-router-dom';

const backendApiURL = 'http://localhost:8081';

function ItemDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    useEffect(() => {
        async function fetchData() {
            console.log(`${backendApiURL}/api/inventories/${id}`);
            try {
                console.log(`${backendApiURL}/api/inventories/${id}`);
                const response = await axios.get(`${backendApiURL}/api/inventories/${id}`);
                console.log(response.data);
                setItemDetails(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        fetchData();
    }, []);

    if (!itemDetails) {
        return <div>Loading!!!</div>
    }

    const isInStock = itemDetails.quantity > 0;
    const statusText = isInStock ? 'IN STOCK' : 'OUT OF STOCK';

    return (
        <div className='container'> 
        <div className='blue-background'></div>
        <div className='item'>{/* container */}
            <div className='item__header'> {/* header */}
                <div className='item__title-layout'>
                    <BackArrow className='item__logo' onClick={() => navigate('/inventory')} />
                    <div className='item__header-name'>{itemDetails.item_name}</div>
                </div>
                <div className='item__header-button'><Edit className='item__edit' /><div className='item__header-button--tablet'>Edit</div></div>
            </div>


            <div className='item__bottom-container'>
                <div className='item__container-tablet1'> {/* item container for tablet mode */}
                    <div className='item__description-container'> {/* item container */}
                        <div className='item__label'>
                            Item Description:
                            <div className='item__description'>
                                {itemDetails.description}
                            </div>
                        </div>
                    </div>

                    <div className='item__status-container'> {/* status container */}
                        <div className='item__container-top'>
                            <div className='item__label'>
                                Category:
                                <div className='item__description'>
                                    {itemDetails.category}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='item__container-bottom'>
                    <div className='item__container-tablet2'>
                        <div className='item__container-bottom-left'>

                            <div className='item__label ='>
                                Status:
                                {/* <div className='item__in-stock'>{itemDetails.status}</div> */}
                                <span className={`item__text ${isInStock ? 'item__in-stock' : 'item__out-of-stock'}`}>
                                    {statusText}
                                </span>
                            </div>
                            <div className='item__label'>
                                Warehouse:
                                <div className='item__description'>
                                    {itemDetails.warehouse_name}
                                </div>
                            </div>
                        </div>
                        <div className='item__label item__label--quantity'>
                            Quantity:
                            <div className='item__description'>
                                {itemDetails.quantity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ItemDetails;