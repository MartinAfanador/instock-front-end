import { useParams } from "react-router-dom";
import "./DeleteWarehouse.scss";
import { useState } from "react";
import axios from "axios";


function DeleteWarehouse({ onCancel }) {

    const { id } = useParams();

    function showHome() {
        window.location.href = '/'
    }    // const [isOpen, setIsOpen] = useState(false)


    function onDeleteModalConfirmed() {
        if (!id) return;
        console.log(id);

        const itemIdValue = id
        async function deleteItem() {
            try {
                const response = await axios.delete(`http://localhost:8086/api/warehouses/${id}`);
                console.log("response.delete ", response.data);
                showHome();
            } catch (error) {
                console.error(error);
                showHome();
            }
        }
        deleteItem();
    }
    // if (!isOpen) return null;

    return (
        <div className="delete__warehouse">
            <div className="delete__warehouse-container">
                <h1 className="delete__warehouse-title">DELETE WASHINGTON WAREHOUSE?</h1>
                <p className="delete__warehouse-text">LOREM IPSUM</p>

            </div >
            <div className="delete__warehouse-button-container">
                <button onClick={showHome}>CANCEL</button>
                <button onClick={onDeleteModalConfirmed}>DELETE</button>
            </div>

        </div>
    )
}

export default DeleteWarehouse;