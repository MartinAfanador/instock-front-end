import './WList.scss';
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';
import { ReactComponent as Unfold } from '../../images/unfold_more_black_24dp.svg';
import { ReactComponent as RightArrow } from '../../images/chevron_right_black_24dp.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteWarehouse from '../../pages/DeleteWarehouse/DeleteWarehouse';

function Wlist() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
    const [mobView, setMobView] = useState(window.innerWidth < 768);


    const itemId = useRef(null);


    function onSearch(searchText) {

    }

    function showDeleteModal(id) {
        itemId.current = id;
        setShouldShowDeleteModal(true);
    }

    function onDeleteModalCancel() {
        setShouldShowDeleteModal(false);
    }

    async function deleteItem(itemIdToDelete) {
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

    function onDeleteModalConfirmed() {
        const itemIdToDelete = itemId.current;
        if (itemIdToDelete) {
            deleteItem(itemIdToDelete);
        }
    }


    useEffect(() => {
        async function getWareHouseData() {
            try {
                const response = await axios.get("http://localhost:8086/api/warehouses");
                setData(response.data);
                setSearchData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getWareHouseData();

        const handleResize = () => {
            setMobView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onEdit(item) {

    }


    let content;
    let backdrop = null;
    if (shouldShowDeleteModal) {
        backdrop = <div className="modal-backdrop" onClick={onDeleteModalCancel}></div>;
    }

    // cmd+sht+p
    console.log("searchData", searchData);
    if (mobView) {
        // Mobile view JSX
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
                            <Link to={`/edit-warehouse/${item.id}`}>
                                <Edit className='warehouse__list__actions-edit' />
                            </Link>
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
    } else {

        if (data.length > 0) {
            const itemsDesk = searchData.map(item => (
                <div className="warehouse__list-row" key={item.id}>
                    <div className="warehouse__list-row-item">
                        {item.warehouse_name}
                        <RightArrow className="warehouse__list-row-item-aicon" />
                    </div>
                    <div className="warehouse__list-row-item-address">{item.address}</div>
                    <div className="warehouse__list-row-item-name">{item.contact_name}</div>
                    <div>
                        <div className='warehouse__list__contact-info-phone'>{item.contact_phone}</div>
                        <div className='warehouse__list__contact-info-email'>{item.contact_email}</div>
                    </div>
                    <div className="warehouse__list-row-item warehouse__list-row-item--actions">
                        <Link to={`/edit-warehouse/${item.id}`}>
                            <Edit className="warehouse__list-row-item__edit-icon" alt="Edit" onClick={() => onEdit(item)} />
                        </Link>
                        {/* <Delete className='warehouse__list__actions-delete' onClick={() => showDeleteModal(item.id)} /> */}
                        <Delete className="warehouse__list-row-item__delete-icon" alt="Delete" onClick={() => showDeleteModal(item.id)} />
                    </div>
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
                        <header className="warehouse__list-header">
                            <div className="warehouse__list-header-item">
                                Inventory Item
                                <Unfold className="warehouse__list-header-item__sort-icon" />
                            </div>
                            <div className="warehouse__list-header-item">
                                Category
                                <Unfold className="warehouse__list-header-item__sort-icon" />
                            </div>
                            <div className="warehouse__list-header-item">
                                Status
                                <Unfold className="warehouse__list-header-item__sort-icon" />
                            </div>
                            <div className="warehouse__list-header-item">
                                Quantity
                                <Unfold className="warehouse__list-header-item__sort-icon" />
                            </div>
                            <div className="warehouse__list-header-item warehouse__list-header-item--actions">
                                Actions
                            </div>
                        </header>
                    </section>
                    {itemsDesk}
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
    }
    return content;
}

export default Wlist;
