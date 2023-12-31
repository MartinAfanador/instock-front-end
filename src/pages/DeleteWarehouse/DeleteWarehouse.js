import "./DeleteWarehouse.scss";
import { ReactComponent as Close } from '../../images/close_black_24dp.svg';

function DeleteWarehouse({ name, isOpen, onCancel, onConfirmed }) {

    if (!isOpen) return null;

    return (
        <div className="delete__background">
            <div className="delete__warehouse">
                <div className="delete__warehouse-box">
                    <Close className="delete__warehouse-close" onClick={onCancel} />
                </div>
                <div className="delete__warehouse-container">
                    <h1 className="delete__warehouse-title">Delete {name} warehouse?</h1>
                    <p className="delete__warehouse-text">Please confirm that you’d like to delete {name} from the list of warehouses. You won’t be able to undo this action.</p>

                </div >
                <div className="delete__warehouse__button__container">
                    <button className='delete__warehouse__button__container-cancel' onClick={onCancel}>Cancel</button>
                    <button className='delete__warehouse__button__container-delete' onClick={onConfirmed}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteWarehouse;