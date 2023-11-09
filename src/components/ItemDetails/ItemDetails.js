import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemDetails.scss';
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';

const backendApiURL = 'http://localhost:8081';

function ItemDetails() {
    // const [category, setCategory] = useState([]);
    // const [itemDesc, setItemDesc] = useState([]);
    // const [warehouse, setWarehouse] = useState([]);
    // const [quantity, setQuantity] = useState([]);

    const [itemDetails, setItemDetails] = useState({
        category: '',
        itemDesc: '',
        warehouse: '',
        quantity: 0,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${backendApiURL}/itemDetails??????`);
                setItemDetails(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        fetchData();
    }, []);


    // useEffect(() => {
    //     //CATEGORY DATA 
    //     async function fetchCategory() {
    //         try {
    //             const response = await axios.get(`${backendApiURL}/`);
    //             setCategory(response.data);
    //         } catch (error) {
    //             console.error('Error fetching category data:', error);
    //         }
    //     }
    //     fetchCategory();

    //     //ITEM DESCRIPTION DATA 
    //     async function fetchItemDesc() {
    //         try {
    //             const response = await axios.get(`${backendApiURL}/`);
    //             setItemDesc(response.data);
    //         } catch (error) {
    //             console.error('Error fetching item description data:', error);
    //         }
    //     }
    //     fetchItemDesc();

    //     //WAREHOUSE DATA 
    //     async function fetchWarehouse() {
    //         try {
    //             const response = await axios.get(`${backendApiURL}/`);
    //             setWarehouse(response.data);
    //         } catch (error) {
    //             console.error('Error fetching warehouse data:', error);
    //         }
    //     }
    //     fetchWarehouse();

    //     //QUANTITY DATA
    //     async function fetchQuantity() {
    //         try {
    //             const response = await axios.get(`${backendApiURL}/`);
    //             setQuantity(response.data);
    //         } catch (error) {
    //             console.error('Error fetching quantity data:', error);
    //         }
    //     }
    //     fetchQuantity();
    // }, []);


    return (
        <div className='item'>{/* container */}
            <div className='item__header'> {/* header */}
                <div className='item__title-layout'>
                    <BackArrow className='item__logo' />
                    <div className='item__header-name'>Item Name</div>
                </div>
                <div className='item__header-button'><Edit className='item__edit' /><div className='item__header-button--tablet'>Edit</div></div>
            </div>


            <div className='item__bottom-container'>
                <div className='item__container-tablet1'> {/* item container for tablet mode */}
                    <div className='item__description-container'> {/* item container */}
                        <div className='item__label'>
                            Item Description:
                            <div className='item__description'>
                                {itemDetails.itemDesc}
                            </div>
                        </div>
                    </div>

                    <div className='item__status-container'> {/* status container */}
                        <div className='item__container-top'>{/* left container */}
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

                            <div className='item__label'>
                                Status:
                                <div className='item__in-stock'>IN STOCK</div>
                            </div>
                            <div className='item__label'>
                                Warehouse:
                                <div className='item__description'>
                                    {itemDetails.warehouse}
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
    )
}
export default ItemDetails;