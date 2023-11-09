import './InventoryListItem.scss';

import { ReactComponent as DeleteIcon} from './../../images/delete_black_24dp.svg';
import { ReactComponent as EditIcon}  from './../../images/edit_black_24dp.svg';
import { ReactComponent as ChevronIcon}  from './../../images/chevron_right_black_24dp.svg';

function InventoryListItem() {

    const item = 'Television';
    const category = 'Electronics';
    const quantity = 500;
    let status = false;
    let statusText = '';
    quantity ? (status = true) : (status = false);
    status ? (statusText = 'IN STOCK') : (statusText = 'OUT OF STOCK')

    return (
        <div className="inventory-item">
            <div className="inventory-item__details-container">
                <div className="inventory-item__details-subcontainer">
                    <div className="inventory-item__item-container">
                        <span className="inventory-item__label">INVENTORY</span>
                        <span className="inventory-item__text inventory-item__item-link">{item}<ChevronIcon className='inventory-item__chevron-icon' alt='A blue chevron sign a white background'/></span>
                    </div>
                    <div className="inventory-item__category-container">
                        <span className="inventory-item__label">CATEGORY</span>
                        <span className="inventory-item__text">{category}</span>
                    </div>
                </div>
                <div className="inventory-item__details-subcontainer">
                    <div className="inventory-item__status-container">
                        <span className="inventory-item__label">STATUS</span>
                        <span className={`inventory-item__text ${(status) ? ('inventory-item__in-stock') : ('inventory-item__out-of-stock')}`} >{statusText}</span>
                    </div>
                    <div className="inventory-item__quantity-container">
                        <span className="inventory-item__label">QUANTITY</span>
                        <span className="inventory-item__text">{quantity}</span>
                    </div>
                </div>
            </div>
            <div className="inventory-item__buttons-container">
                <button className="inventory-item__button"><DeleteIcon className='inventory-item__delete-icon' alt='A red trash can on a white background' /></button>
                <button className="inventory-item__button"><EditIcon className='inventory-item__edit-icon' alt='A blue pencil on a white background' /></button>
            </div>
        </div>
    );
}

export default InventoryListItem;