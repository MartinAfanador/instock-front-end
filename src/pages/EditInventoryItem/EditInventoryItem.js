import './EditInventoryItem.scss';

import { ReactComponent as BackIcon } from './../../images/arrow_back_black_24dp.svg';
import { ReactComponent as DropDownIcon } from './../../images/arrow_drop_down_black_24dp.svg';
import { ReactComponent as ErrorIcon } from './../../images/error_black_24dp.svg';

import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

function EditInventoryItem() {
    
    const navigate = useNavigate();
    const { id } = useParams();

    const errorMessage = 'This field is required';
    const defaultWarehouse = { warehouse_name : 'Please select' };
    
    const categoryOptions = ['Electronics', 'Gear', 'Apparel', 'Accessories', 'Health'];

    const [warehouseOptions, setWarehouseOptions] = useState(null);

    const [currentItem, setCurrentItem] = useState(null);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(defaultWarehouse);

    const [firstRender, setFirstRender] = useState(true);

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);

    const changeName = (event) => {
        setItemName(event.target.value);
    }

    const changeDescription = (event) => {
        setItemDescription(event.target.value);
    }

    const changeStatus = (event) => {
        setItemStatus(event.target.value);
    }

    const changeQuantity = (event) => {
        setItemQuantity(event.target.value);
    }

    const toggleCategoryDropdown = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }

    const toggleWarehouseDropdown = () => {
        setIsWarehouseOpen(!isWarehouseOpen);
    }

    const handleCategoryDropDown = (option) => {
        setSelectedCategory(option);
        setIsCategoryOpen(false);
    }

    const handleWarehouseDropDown = (option) => {
        setSelectedWarehouse(option);
        setIsWarehouseOpen(false);
    }

    const handleCancel = () => {
        navigate('/inventory');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFirstRender(false);

        if (!itemName || !itemDescription || (selectedCategory === 'Please select') ||
            !itemStatus || (selectedWarehouse.warehouse_name === 'Please select')) {
            return;
        }

        if (isNaN(itemQuantity)) {
            alert(`The quantity must be have a numeric value! ${typeof itemQuantity}`)
            return;
        }

        if (itemStatus === 'In Stock' && itemQuantity == 0) {
            alert('Please provide item quantity or select out of stock!');
            return;
        }

        try {

            const newEntry = {
                warehouse_id: selectedWarehouse.id,
                item_name: itemName,
                description: itemDescription,
                category: itemDescription,
                status: itemStatus,
                quantity: Number(itemQuantity)
            }

            console.log(newEntry);

            //const response = await axios.put(`http://localhost:8080/api/inventories/${id}`, newEntry);
            alert('The item has been successfully updated!');
            //navigate('/inventory');
        } catch (error) {
            console.error();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const warehouses = await axios.get('http://localhost:8080/api/warehouses');
            setWarehouseOptions(warehouses.data);
        
            const response = await axios.get(`http://localhost:8080/api/inventories/${id}`);

            setCurrentItem(response.data);
            
            setItemName(response.data.item_name);
            setItemDescription(response.data.description);
            setSelectedCategory(response.data.category);
            setItemStatus(response.data.status);
            setItemQuantity(response.data.quantity);

            const matchedWarehouse = warehouses.data.filter((warehouse) => response.data.warehouse_name === warehouse.warehouse_name);
            setSelectedWarehouse(matchedWarehouse[0]);
        }

        fetchData();
    }, []);

    if (!currentItem) {
        return (<div>Loading!</div>);
    }
    return (
        <main>
            <div className='edit-inventory'>
                <div className='edit-inventory__heading-container'>
                    <Link to='/inventory'><BackIcon className='edit-inventory__back-icon' alt='A blue back arrow on a white background' /></Link>
                    <h1 className='edit-inventory__heading'>Edit Inventory Item</h1>
                </div>
                <form className='edit-inventory__form'>
                    <div className='edit-inventory__main-container'>
                        <div className='edit-inventory__details-container'>
                            <h2 className='edit-inventory__subheading'>Item Details</h2>
                            <div className='edit-inventory__name-container'>
                                <label className='edit-inventory__label' htmlFor='item-name'>Item Name</label>
                                <input
                                    className='edit-inventory__input'
                                    type='text' id='item-name'
                                    name='item-name'
                                    placeholder='Item Name'
                                    value={itemName}
                                    onChange={changeName} />
                                <div className={`${(itemName !== '' || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='edit-inventory__description-container'>
                                <label className='edit-inventory__label' htmlFor='item-description'>Description</label>
                                <textarea
                                    className='edit-inventory__input-description edit-inventory__input'
                                    id='item-description'
                                    name='item-description'
                                    placeholder='Please enter a brief item description...'
                                    value={itemDescription}
                                    onChange={changeDescription} />
                                <div className={`${(itemDescription !== '' || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='edit-inventory__category-container'>
                                <label className='edit-inventory__label'>Category</label>
                                <div className='edit-inventory__input-category' onClick={toggleCategoryDropdown}>
                                    <div className='edit-inventory__category-option'>
                                        {selectedCategory}
                                        <DropDownIcon className='edit-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    </div>
                                    {
                                        isCategoryOpen && (
                                            <ul className='edit-inventory__category-list'>
                                                {
                                                    categoryOptions.map((option) => {
                                                        return <li
                                                            key={option}
                                                            className='edit-inventory__category-list-item'
                                                            onClick={() => handleCategoryDropDown(option)}>
                                                            {option}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                                <div className={`${(selectedCategory !== 'Please select' || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className='edit-inventory__availability-container'>
                            <h2 className='edit-inventory__subheading'>Item Availability</h2>
                            <div className='edit-inventory__status-container'>
                                <label className='edit-inventory__label'>Status</label>
                                <div className='edit-inventory__radio-button-container'>
                                    <div className='edit-inventory__in-stock-container'>
                                        <input className='edit-inventory__radio-button'
                                            type='radio'
                                            id='in-stock'
                                            name='availability'
                                            value='In Stock'
                                            checked={itemStatus === 'In Stock'}
                                            onChange={changeStatus} />
                                        <label className='edit-inventory__in-stock-label' htmlFor='in-stock'>In stock</label>
                                    </div>
                                    <div className='edit-inventory__out-of-stock-container'>
                                        <input
                                            className='edit-inventory__radio-button'
                                            type='radio'
                                            id='out-of-stock'
                                            name='availability'
                                            value='Out of Stock'
                                            checked={itemStatus === 'Out of Stock'}
                                            onChange={changeStatus} />
                                        <label className='edit-inventory__out-of-stock-label' htmlFor='out-of-stock'>Out of stock</label>
                                    </div>
                                </div>
                                <div className={`${(itemStatus !== '' || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className={`${(itemStatus === 'Out of Stock') ? 'hide' : 'edit-inventory__quantity-container'}`}>
                                <label className='edit-inventory__label' htmlFor='quantity'>Quantity</label>
                                <input
                                    className='edit-inventory__input'
                                    type='text'
                                    id='quantity'
                                    name='quantity'
                                    placeholder='Item Quantity'
                                    value={itemQuantity}
                                    onChange={changeQuantity} />
                                <div className={`${((itemStatus && itemQuantity != 0) || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='edit-inventory__warehouse-container'>
                                <label className='edit-inventory__label'>Warehouse</label>
                                <div className='edit-inventory__input-category' onClick={toggleWarehouseDropdown}>
                                    <div className='edit-inventory__category-option'>
                                        {selectedWarehouse.warehouse_name}
                                        <DropDownIcon className='edit-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    </div>
                                    {
                                        isWarehouseOpen && (
                                            <ul className='edit-inventory__category-list'>
                                                {
                                                    warehouseOptions.map((option) => {
                                                        return <li
                                                            key={option.id}
                                                            className='edit-inventory__category-list-item'
                                                            onClick={() => handleWarehouseDropDown(option)}>
                                                            {option.warehouse_name}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                                <div className={`${(selectedWarehouse !== 'Please select' || firstRender) ? 'hide' : 'edit-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="edit-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='edit-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='edit-inventory__buttons-container'>
                        <button className='edit-inventory__cancel-button' onClick={handleCancel}>Cancel</button>
                        <button className='edit-inventory__save-button' onClick={handleSubmit}>Save</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default EditInventoryItem;