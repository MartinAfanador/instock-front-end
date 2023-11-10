import { useParams } from "react-router-dom";
import "./DeleteWarehouse.scss";
import axios from "axios";
import { ReactComponent as Close } from '../../images/close_black_24dp.svg';


function DeleteWarehouse({ isOpen, onCancel }) {

    const { id } = useParams();

    function showHome() {
        window.location.href = '/'
    }

    function onDeleteModalConfirmed() {
        if (!id) return;


        const itemIdValue = id
        async function deleteItem() {
            try {
                const response = await axios.delete(`http://localhost:8086/api/warehouses/${id}`);

                showHome();
            } catch (error) {
                console.error(error);
                showHome();
            }
        }
        deleteItem();
    }
    if (!isOpen) return null;

    return (
        <div className="delete__background">
            <div className="delete__warehouse">
                <div className="delete__warehouse-box">
                    <Close className="delete__warehouse-close" onClick={showHome} />
                </div>
                <div className="delete__warehouse-container">
                    <h1 className="delete__warehouse-title">Delete Washington warehouse?</h1>
                    <p className="delete__warehouse-text">Please confirm that you’d like to delete the Washington from the list of warehouses. You won’t be able to undo this action.</p>

                </div >
                <div className="delete__warehouse__button__container">
                    <button className='delete__warehouse__button__container-cancel' onClick={onCancel}>Cancel</button>
                    <button className='delete__warehouse__button__container-delete' onClick={onDeleteModalConfirmed}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteWarehouse;