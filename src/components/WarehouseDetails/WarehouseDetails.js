
import './WarehouseDetails.scss';

import { ReactComponent as DeleteIcon } from './../../images/delete_black_24dp.svg';
import { ReactComponent as EditIcon } from './../../images/edit_black_24dp.svg';
import { ReactComponent as ChevronIcon } from './../../images/chevron_right_black_24dp.svg';
import { ReactComponent as UnfoldMoreIcon } from './../../images/unfold_more_black_24dp.svg'
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';
import WarehouseInventoryListItem from '../../components/WarehouseInventoryListItem/WarehouseInventoryListItem';
import DeleteInventoryItem from '../../pages/DeleteInventoryItem/DeleteInventoryItem';

const backendApiURL = 'http://localhost:8086';

function WarehouseDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState([]);
    const [inventories, setInventories] = useState([]);
    const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);

    const itemId = useRef({});

    // console.log("WarehouseDetails ", id);

    useEffect(() => {
        async function fetchData() {
            console.log(`${backendApiURL}/api/warehouses/${id}`);
            try {
                console.log(`${backendApiURL}/api/warehouses/${id}`);
                const response = await axios.get(`${backendApiURL}/api/warehouses/${id}`);
                console.log(response.data);
                const responseInventories = await axios.get(`http://localhost:8086/api/warehouses/${id}/inventories`);
                console.log("responseInventories ", responseInventories.data);
                setItemDetails(response.data);
                setInventories(responseInventories.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        fetchData();
    }, []);


    function showDeleteModal(item) {
        itemId.current = item;

        setShouldShowDeleteModal(true);
    }

    function onDeleteModalCancel() {
        setShouldShowDeleteModal(false);
    }

    async function deleteItem(itemIdToDeleteId) {
        try {
            setShouldShowDeleteModal(false);
            const response = await axios.delete(`http://localhost:8086/api/inventories/${itemIdToDeleteId}`);
            console.log("response", response);
            const filteredData = inventories.filter(item => item.id !== itemIdToDeleteId);
            console.log(filteredData);
            setInventories(filteredData);
            alert('Item deleted');
        } catch (error) {
            console.error(error);
        }

    }

    function onDeleteModalConfirmed() {
        const itemIdToDelete = itemId.current;

        if (itemIdToDelete) {
            deleteItem(itemIdToDelete.id);
        }
    }

    let backdrop = null;
    if (shouldShowDeleteModal) {
        backdrop = <div className="modal-backdrop" onClick={onDeleteModalCancel}></div>;
    }

    if (!itemDetails) {
        return <div>Loading!!!</div>
    }

    const isInStock = itemDetails.quantity > 0;
    const statusText = isInStock ? 'IN STOCK' : 'OUT OF STOCK';
    

    return (
        <div className='container_wh'>
            <div className='blue-background_wh'></div>
            <div className='item_wh'>{/* container */}
                <div className='item_wh__header'> {/* header */}
                    <div className='item_wh__title-layout'>
                        <BackArrow className='item_wh__logo' onClick={() => navigate(-1)} />
                        <div className='item_wh__header-name'>{itemDetails.warehouse_name}</div>
                    </div>
                    {/* Edit functionaly needs to be copied over fomr ItemDetail Details compoenent */}
                    <div className='item_wh__header-button'>
                        <Link to={`/warehouses/edit-warehouse/${id}`}><Edit className='item_wh__edit' /><div className='item_wh__header-button--tablet'>Edit</div></Link></div>
                </div>


                <div className='item_wh__bottom-container'>
                    <div className='item_wh__container-tablet1'> {/* item container for tablet mode */}
                        <div className='item_wh__description-container'> {/* item container */}
                            <div className='item_wh__label'>
                                WAREHOUSE ADDRESS:
                                <div className='item__description'>
                                    {itemDetails.address}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='item_wh__container-bottom'>
                        <div className='item_wh__container-tablet2'>
                            <div className='item__container-bottom-left'>

                                <div className='item_wh__label ='>
                                    CONTACT NAME:
                                    <div className='item__description'>{itemDetails.contact_name}</div>
                                    <div className='item__description'>
                                        {itemDetails.contact_position}
                                    </div>
                                </div>

                            </div>
                            <div className='item_wh__label item_wh__label--quantity'>
                                CONTACT INFORMATION:
                                <div className='item__description'>
                                    {itemDetails.contact_email}
                                </div>
                                <div className='item__description'>
                                    {itemDetails.contact_phone}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='inventories__inventory-list'>
                <div className='inventories__labels-container'>
                    <div className='inventories__details-container'>
                        <div className='item_wh__left-subcontainer'>
                            <div className='inventories__item-container'>
                                <span className='inventories__label'>INVENTORY ITEM</span>
                                <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                            </div>
                            <div className='inventories__category-container'>
                                <span className='item_wh__label'>CATEGORY</span>
                                <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                            </div>
                        </div>
                        <div className='item_wh__right-subcontainer'>
                            <div className='item_wh__status-container'>
                                <span className='item_wh__label'>STATUS</span>
                                <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                            </div>
                            <div className='item_wh__quantity-container'>
                                <span className='item_wh__label'>QUANTITY</span>
                                <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                            </div>
                            {/* <div className='inventories__warehouse-container'>
                                <span className='inventories__label'>WAREHOUSE</span>
                                <UnfoldMoreIcon className='inventories__unfold-logo' alt='a black up and down arrow on a white background' />
                            </div> */}
                        </div>
                    </div>
                    <div className='inventories_wh__buttons-container'>
                        <span className='inventories__label'>ACTIONS</span>
                    </div>
                </div>
                {
                    inventories.map((item) => <WarehouseInventoryListItem key={item.id} item={item} onDeleteClick={showDeleteModal} />)
                }
            </div>
            {backdrop}
            < DeleteInventoryItem
                name={itemId.current.item_name}
                isOpen={shouldShowDeleteModal}
                onCancel={onDeleteModalCancel}
                onConfirmed={onDeleteModalConfirmed}
            />

        </div>
    )
}

export default WarehouseDetails;