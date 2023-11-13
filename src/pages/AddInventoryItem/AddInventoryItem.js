import './AddInventoryItem.scss';

import { ReactComponent as BackIcon } from './../../images/arrow_back_black_24dp.svg';
import { ReactComponent as DropDownIcon } from './../../images/arrow_drop_down_black_24dp.svg';
import { ReactComponent as ErrorIcon } from './../../images/error_black_24dp.svg';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function AddInventoryItem() {

    const navigate = useNavigate();

    const errorMessage = 'This field is required';
    const defaultWarehouse = { warehouse_name : 'Please select' };

    const categoryOptions = ['Electronics', 'Gear', 'Apparel', 'Accessories', 'Health'];

    const [warehouseOptions, setWarehouseOptions] = useState(null);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Please select');

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
        navigate('/inventories');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFirstRender(false);

        if (!itemName || !itemDescription || (selectedCategory === 'Please select') ||
            !itemStatus || (selectedWarehouse === 'Please select')) {
                return;
        }

        if (isNaN(itemQuantity)) {
            alert (`The quantity must be have a numeric value! ${typeof itemQuantity}`)
            return;
        }

        if (itemStatus === 'In Stock' && itemQuantity == 0) {
            alert('Please provide item quantity or select out of stock!');
            return;
        }

        try {

            const newEntry = {
                warehouse_id: selectedWarehouse.id,
                item_name : itemName,
                description : itemDescription,
                category : itemDescription,
                status : itemStatus,
                quantity : Number(itemQuantity)
            }

            const response = await axios.post('http://localhost:8080/api/inventories', newEntry);
            alert('The item has been successfully added!');
            navigate('/inventories');
        } catch (error) {
            console.error();
        }
        
        

    }

    useEffect(() => {
        const fetchWarehouses = async () => {
            const response = await axios.get('http://localhost:8080/api/warehouses');
            setWarehouseOptions(response.data);
        }

        fetchWarehouses();
    }, []);

    if (!warehouseOptions) {
        return (<div>Loading!</div>);
    }

    return (
        <main>
            <div className='add-inventory'>
                <div className='add-inventory__heading-container'>
                    <Link to='/inventories'><BackIcon className='add-inventory__back-icon' alt='A blue back arrow on a white background' /></Link>
                    <h1 className='add-inventory__heading'>Add New Inventory Item</h1>
                </div>
                <form className='add-inventory__form'>
                    <div className='add-inventory__main-container'>
                        <div className='add-inventory__details-container'>
                            <h2 className='add-inventory__subheading'>Item Details</h2>
                            <div className='add-inventory__name-container'>
                                <label className='add-inventory__label' htmlFor='item-name'>Item Name</label>
                                <input
                                    className='add-inventory__input'
                                    type='text' id='item-name'
                                    name='item-name'
                                    placeholder='Item Name'
                                    onChange={changeName} />
                                <div className={`${(itemName !== '' || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='add-inventory__description-container'>
                                <label className='add-inventory__label' htmlFor='item-description'>Description</label>
                                <textarea
                                    className='add-inventory__input-description add-inventory__input'
                                    id='item-description'
                                    name='item-description'
                                    placeholder='Please enter a brief item description...'
                                    onChange={changeDescription} />
                                    <div className={`${(itemDescription !== '' || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='add-inventory__category-container'>
                                <label className='add-inventory__label'>Category</label>
                                <div className='add-inventory__input-category' onClick={toggleCategoryDropdown}>
                                    <div className='add-inventory__category-option'>
                                        {selectedCategory}
                                        <DropDownIcon className='add-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    </div>
                                    {
                                        isCategoryOpen && (
                                            <ul className='add-inventory__category-list'>
                                                {
                                                    categoryOptions.map((option) => {
                                                        return <li
                                                            key={option}
                                                            className='add-inventory__category-list-item'
                                                            onClick={() => handleCategoryDropDown(option)}>
                                                            {option}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                                <div className={`${(selectedCategory !== 'Please select' || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                        </div>
                        <div className='add-inventory__availability-container'>
                            <h2 className='add-inventory__subheading'>Item Availability</h2>
                            <div className='add-inventory__status-container'>
                                <label className='add-inventory__label'>Status</label>
                                <div className='add-inventory__radio-button-container'>
                                    <div className='add-inventory__in-stock-container'>
                                        <input className='add-inventory__radio-button'
                                            type='radio'
                                            id='in-stock'
                                            name='availability'
                                            value='In Stock'
                                            onChange={changeStatus} />
                                        <label className='add-inventory__in-stock-label' htmlFor='in-stock'>In stock</label>
                                    </div>
                                    <div className='add-inventory__out-of-stock-container'>
                                        <input
                                            className='add-inventory__radio-button'
                                            type='radio'
                                            id='out-of-stock'
                                            name='availability'
                                            value='Out of Stock'
                                            onChange={changeStatus} />
                                        <label className='add-inventory__out-of-stock-label' htmlFor='out-of-stock'>Out of stock</label>
                                    </div>
                                </div>
                                <div className={`${(itemStatus !== '' || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className={`${(itemStatus === 'Out of Stock') ? 'hide' : 'add-inventory__quantity-container'}`}>
                                <label className='add-inventory__label' htmlFor='quantity'>Quantity</label>
                                <input
                                    className='add-inventory__input'
                                    type='text'
                                    id='quantity'
                                    name='quantity'
                                    placeholder='Item Quantity'
                                    onChange={changeQuantity} />
                                    <div className={`${((itemStatus && itemQuantity != 0) || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                            <div className='add-inventory__warehouse-container'>
                                <label className='add-inventory__label'>Warehouse</label>
                                <div className='add-inventory__input-category' onClick={toggleWarehouseDropdown}>
                                    <div className='add-inventory__category-option'>
                                        {selectedWarehouse.warehouse_name}
                                        <DropDownIcon className='add-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    </div>
                                    {
                                        isWarehouseOpen && (
                                            <ul className='add-inventory__category-list'>
                                                {
                                                    warehouseOptions.map((option) => {
                                                        return <li
                                                            key={option.id}
                                                            className='add-inventory__category-list-item'
                                                            onClick={() => handleWarehouseDropDown(option)}>
                                                            {option.warehouse_name}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                                <div className={`${(selectedWarehouse.warehouse_name !== 'Please select' || firstRender) ? 'hide' : 'add-inventory__error-container'}`}>
                                    <ErrorIcon
                                        className="add-inventory__error-icon"
                                        alt="white exclamation point on a red background"
                                    />
                                    <span className='add-inventory__error-message'>{`${errorMessage}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='add-inventory__buttons-container'>
                        <button className='add-inventory__cancel-button' onClick={handleCancel}>Cancel</button>
                        <button className='add-inventory__add-button' onClick={handleSubmit}>+ Add Item</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default AddInventoryItem;