import './WList.scss';
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DeleteWarehouse from '../../pages/DeleteWarehouse/DeleteWarehouse';

function Wlist() {
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);


    const itemId = useRef(null);

    useEffect(() => {
        async function getWareHouseData() {
            try {
                const response = await axios.get("http://localhost:8081/api/warehouses");
                setData(response.data);
                setSearchData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getWareHouseData();
    }, []);

    function onSearch(searchText) { }

    function showDeleteModal(id) {
        itemId.value = id;

        setShouldShowDeleteModal(true);
    }

    function onDeleteModalCancel() {
        setShouldShowDeleteModal(false);
    }

    function onDeleteModalConfirmed() {
        const itemIdToDelete = itemId.value;

        async function deleteItem() {
            try {
                await axios.delete(`http://localhost:8086/api/warehouses/${itemIdToDelete}`);
                const filteredData = searchData.filter(item => item.id !== itemIdToDelete);
                setSearchData(filteredData);
                setData(filteredData);
            } catch (error) {
                console.error(error);
            } finally {
                setShouldShowDeleteModal(false);
            }
        }
        if (itemIdToDelete) {
            deleteItem();
        }
    }

    let backdrop = null;
    if (shouldShowDeleteModal) {
        backdrop = <div className="modal-backdrop" onClick={onDeleteModalCancel}></div>;
    }


    let content = null;
    if (data.length > 0) {
        const items = searchData.map(item => (
            <div key={item.id} className='warehouse__list'>
                <section className='warehouse__list__section'>
                    <div className='warehouse__list__section-flex'>
                        <div className='warehouse__list__section-container'>
                            <div className='warehouse__list__section-label'>WAREHOUSE</div>
                            <div className='warehouse__list__section-value'>{item.warehouse_name}</div>
                        </div>

                        <div className='warehouse__list__section-container'>
                            <div className='warehouse__list__section-label'>ADDRESS</div>
                            <div className='warehouse__list__section-value'>{item.address}</div>
                        </div>
                    </div>

                    <div className='warehouse__list__section-flex'>
                        <div className='warehouse__list__section-container'>
                            <div className='warehouse__list__section-label'>CONTACT NAME</div>
                            <div className='warehouse__list__section-value'>{item.contact_name}</div>
                        </div>

                        <div className='warehouse__list__section-container'>
                            <div className='warehouse__list__section-label'>CONTACT INFORMATION</div>
                            <div className='warehouse__list__contact-info-phone'>{item.contact_phone}</div>
                            <div className='warehouse__list__contact-info-email'>{item.contact_email}</div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className='warehouse__list__actions'>
                        <Delete className='warehouse__list__actions-delete' onClick={() => showDeleteModal(item.id)} />
                        <Edit className='warehouse__list__actions-edit' />
                    </div>
                </section>
            </div>
        ));

        content = (
            <div className='warehouse__list'>
                <section className='warehouse__list__header'>
                    <h1 className='warehouse__list__header-title'>Warehouses</h1>
                    <div className='warehouse__list__header-search'>
                        <input className='warehouse__list__header-input' placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
                    </div>
                    <div className='warehouse__list__header-add'>
                        <button className='warehouse__list__header-add-button' type="submit">+ Add New Warehouse</button>
                    </div>
                </section>
                {items}
                {backdrop}
                <DeleteWarehouse
                    isOpen={shouldShowDeleteModal}
                    onCancel={onDeleteModalCancel}
                    onConfirmed={onDeleteModalConfirmed}
                />

            </div>
        );
    } else {
        content = <div>No data</div>;
    }

    return content;
}

export default Wlist;
