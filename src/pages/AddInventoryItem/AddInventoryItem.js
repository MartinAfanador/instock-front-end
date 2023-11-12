import './AddInventoryItem.scss';
import { ReactComponent as BackIcon } from './../../images/arrow_back_black_24dp.svg';
import { ReactComponent as DropDownIcon } from './../../images/arrow_drop_down_black_24dp.svg';
import { useState, useEffect } from 'react';
function AddInventoryItem() {
    const categoryOptions = ['Electronics', 'Gear', 'Apparel', 'Accessories', 'Health'];
    const warehouseOptions = ['Manhatten', 'Washington', 'Jersey', 'SF', 'Santa Monica', 'Seattle', 'Miami', 'Boston'];
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Please select');
    const toggleCategoryDropdown = () => {
        setIsCategoryOpen(!isCategoryOpen);
    }
    const handleCategoryDropDown = (option) => {
        setSelectedCategory(option);
        setIsCategoryOpen(false);
    }
    const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState('Please select');
    const toggleWarehouseDropdown = () => {
        setIsWarehouseOpen(!isWarehouseOpen);
    }
    const handleWarehouseDropDown = (option) => {
        setSelectedWarehouse(option);
        setIsWarehouseOpen(false);
    }
    return (
        <main>
            <div className='add-inventory'>
                <div className='add-inventory__heading-container'>
                    <BackIcon className='add-inventory__back-icon' alt='A blue back arrow on a white background' />
                    <h1 className='add-inventory__heading'>Add New Inventory Item</h1>
                </div>
                <form className='add-inventory__form'>
                    <div className='add-inventory__main-container'>
                        <div className='add-inventory__details-container'>
                            <h2 className='add-inventory__subheading'>Item Details</h2>
                            <div className='add-inventory__name-container'>
                                <label className='add-inventory__label' htmlFor='item-name'>Item Name</label>
                                <input className='add-inventory__input-name' type='text' id='item-name' name='item-name' placeholder='Item Name' />
                            </div>
                            <div className='add-inventory__name-container'>
                                <label className='add-inventory__label' htmlFor='item-description'>Description</label>
                                <textarea className='add-inventory__input-description' id='item-description' name='item-description' placeholder='Please enter a brief item description...' />
                            </div>
                            <div className='add-inventory__category-container'>
                                <label className='add-inventory__label'>Category</label>
                                <div className='add-inventory__input-category' onClick={toggleCategoryDropdown}>
                                    {selectedCategory}
                                    <DropDownIcon className='add-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    {
                                        isCategoryOpen && (
                                            <ul className='add-inventory__category-list'>
                                                {
                                                    categoryOptions.map((option) => {
                                                        return <li
                                                            key={option}
                                                            className='add-inventory__category-item'
                                                            onClick={() => handleCategoryDropDown(option)}>
                                                            {option}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='add-inventory__availability-container'>
                            <h2 className='add-inventory__subheading'>Item Availability</h2>
                            <div className='add-inventory__status-container'>
                                <label className='add-inventory__label'>Status</label>
                                <div className='add-inventory__radio-button-container'>
                                    <div className='add-inventory__in-stock-container'>
                                        <input className='add-inventory__radio-button' type='radio' id='in-stock' name='availability' value='In Stock' />
                                        <label className='add-inventory__in-stock-label' htmlFor='in-stock'>In stock</label>
                                    </div>
                                    <div className='add-inventory__out-of-stock-container'>
                                        <input className='add-inventory__radio-button' type='radio' id='out-of-stock' name='availability' value='Out Of Stock' />
                                        <label className='add-inventory__out-of-stock-label' htmlFor='out-of-stock'>Out of stock</label>
                                    </div>
                                </div>
                            </div>
                            <div className='add-inventory__quantity-container'>
                                <label className='add-inventory__label' htmlFor='quantity'>Quantity</label>
                                <input className='add-inventory__input-quantity' type='text' id='quantity' name='quantity' />
                            </div>
                            <div className='add-inventory__input-warehouse' onClick={toggleWarehouseDropdown}>
                                    {selectedWarehouse}
                                    <DropDownIcon className='add-inventory__drop-down-icon' alt='A black down arrow on a white background' />
                                    {
                                        isWarehouseOpen && (
                                            <ul className='add-inventory__category-list'>
                                                {
                                                    warehouseOptions.map((option) => {
                                                        return <li
                                                            key={option}
                                                            className='add-inventory__category-item'
                                                            onClick={() => handleWarehouseDropDown(option)}>
                                                            {option}
                                                        </li>
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </div>
                        </div>
                    </div>
                    <div className='add-inventory__buttons-container'>
                        <button className='add-inventory__cancel-button'>Cancel</button>
                        <button className='add-inventory__add-button'>+ Add Item</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default AddInventoryItem;