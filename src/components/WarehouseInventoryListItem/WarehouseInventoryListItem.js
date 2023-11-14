import './WarehouseInventoryListItem.scss';

import { ReactComponent as DeleteIcon } from './../../images/delete_black_24dp.svg';
import { ReactComponent as EditIcon } from './../../images/edit_black_24dp.svg';
import { ReactComponent as ChevronIcon } from './../../images/chevron_right_black_24dp.svg';
import { Link } from 'react-router-dom';

function WarehouseInventoryListItem({ item, onDeleteClick }) {

    const id = item.id;
    const itemName = item.item_name;
    const category = item.category;
    const quantity = item.quantity;
    const warehouse = item.warehouse_name;
    let statusText = item.status;
    let status = false;
    quantity ? (status = true) : (status = false);

    return (
        <div className="inventory__warehouse-item">
            <div className="inventory__warehouse-item__details-container">
                <div className="inventor__warehouse-item__details-subcontainer inventory__warehouse-item__left-subcontainer">
                    <div className="inventory__warehouse-item__item-container">
                        <span className="inventory__warehouse-item__label">INVENTORY ITEM</span>
                        <Link to={`/inventories/inventory/${id}`}><span className="inventory__warehouse-item__text inventory__warehouse-item__item-link">{itemName}<ChevronIcon className='inventory-item__chevron-icon' alt='A blue chevron sign a white background' /></span></Link>
                    </div>
                    <div className="inventory__warehouse-item__category-container">
                        <span className="inventory__warehouse-item__label">CATEGORY</span>
                        <span className="inventory__warehouse-item__text">{category}</span>
                    </div>
                </div>
                <div className="inventory__warehouse-item__details-subcontainer inventory__warehouse-item__right-subcontainer">
                    <div className="inventory__warehouse-item__status-container">
                        <span className="inventory__warehouse-item__label">STATUS</span>
                        <span className={`inventory__warehouse-item__text ${(status) ? ('inventory__warehouse-item__in-stock') : ('inventory-item__out-of-stock')}`} >{statusText}</span>
                    </div>
                    <div className="inventory__warehouse-item__quantity-container">
                        <span className="inventory__warehouse-item__label">QUANTITY</span>
                        <span className="inventory__warehouse-item__text">{quantity}</span>
                    </div>
                    
                </div>
            </div>
            <div className="inventory__warehouse-item__buttons-container">
                <button className="inventory__warehouse-item__button" onClick={() => {
                    onDeleteClick(item);
                }}>
                    <DeleteIcon className='inventory-item__delete-icon' alt='A red trash can on a white background' /></button>
                <Link to={`/inventories/edit-inventory-item/${id}`}><button className="inventory__warehouse-item__button">
                    <EditIcon className='inventory__warehouse-item__edit-icon' alt='A blue pencil on a white background' />
                </button></Link>
            </div>
        </div>
    );
}

export default WarehouseInventoryListItem;
