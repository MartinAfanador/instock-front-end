import './WList.scss';
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg';
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg';
import { ReactComponent as Unfold } from '../../images/unfold_more_black_24dp.svg';
import { ReactComponent as RightArrow } from '../../images/chevron_right_black_24dp.svg';
import { ReactComponent as Search } from '../../images/search_black_24dp.svg';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import DeleteWarehouse from '../../pages/DeleteWarehouse/DeleteWarehouse';

function Wlist() {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
    const [mobView, setMobView] = useState(window.innerWidth < 768);
    const navigate = useNavigate();


    console.log("wlist");
    const itemId = useRef({});


    function onSearch(searchText) {

    }

    function showDeleteModal(item) {
        itemId.current = item;
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
            deleteItem(itemIdToDelete.id);
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

    if (mobView) {
        // Mobile view JSX
        if (data.length > 0) {
            const items = searchData.map(item => (
                <div key={item.id} className='warehouse__list'>
                    <section className='warehouse__list__section'>
                        <div className='warehouse__list__section-flex'>
                            <div className='warehouse__list__section-container'>
                                <div className='warehouse__list__section-label'>WAREHOUSE</div>
                                <div className='warehouse__list__section-value'>
                                    <Link className='warehouse__list__section-icon-box' to={`/warehouses/${item.id}`}>{item.warehouse_name}
                                        <RightArrow className='inventory-item__chevron-icon' alt='A blue chevron sign a white background' />
                                    </Link>
                                </div>
                            </div>

                            <div className='warehouse__list__section-container-address'>
                                <div className='warehouse__list__section-label'>ADDRESS</div>
                                <div className='warehouse__list__section-flex-two'>
                                    <div className='warehouse__list__section-value'>{item.address},{item.city},{item.country}</div>
                                </div>
                            </div>
                        </div>

                        <div className='warehouse__list__section-flex-three'>
                            <div className='warehouse__list__section-container'>
                                <div className='warehouse__list__section-label'>CONTACT NAME</div>
                                <div className='warehouse__list__section-value'>{item.contact_name}</div>
                            </div>

                            <div className='warehouse__list__section-container'>
                                <div className='warehouse__list__section-label'>CONTACT INFORMATION</div>
                                <div className='warehouse__list__section-phone'>{item.contact_phone}</div>
                                <div className='warehouse__list__section-email'>{item.contact_email}</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className='warehouse__list__actions'>
                            <Delete className='warehouse__list__actions-delete' onClick={() => showDeleteModal(item)} />
                            <Link to={`/warehouses/edit-warehouse/${item.id}`}>
                                <Edit className='warehouse__list__actions-edit' />
                            </Link>
                        </div>
                    </section>
                </div>
            ));

            content = (
                <div className='warehouse__list__header'>
                    <section className='warehouse__list__header__flex'>
                        <h1 className='warehouse__list__header__flex-title'>Warehouses</h1>
                        <div className='warehouse__list__header-search'>
                            <input className='warehouse__list__header-input' placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
                            <div className='warehouse__list__header-container'>
                                <Search className="warehouse__list__header-icon" />
                            </div>
                        </div>
                        <div className='warehouse__list__header-add'>
                            <button className='warehouse__list__header-add-button' onClick={() => navigate('/warehouses/add-warehouse')}>+ Add New Warehouse</button>
                        </div>
                    </section>
                    {items}
                    {backdrop}
                    <DeleteWarehouse
                        name={itemId.current.warehouse_name}
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
                <div className="warehouse__list__row" key={item.id}>

                    <div className="warehouse__list__tab-item1">
                        <div className="warehouse__list__tab-item-name">
                            <Link className="warehouse__list__tab-item-link" to={`/warehouses/${item.id}`}>{item.warehouse_name}
                                <RightArrow className='inventory-item__chevron-icon' alt='A blue chevron sign a white background' />
                            </Link>
                        </div>
                        <div className="warehouse__list__tab-item3">{item.address},{item.city},{item.country}</div>
                    </div>
                    <div className="warehouse__list__tab-item1">

                        <div className="warehouse__list__tab-item2">{item.contact_name}</div>
                        <div className='warehouse__list__tab-details'>
                            <div className='warehouse__list__tab-phone'>{item.contact_phone}</div>
                            <div className='warehouse__list__tab-email'>{item.contact_email}</div>
                        </div>
                    </div>
                    <div className="warehouse__list__row-edit">

                        {/* <Delete className='warehouse__list__actions-delete' onClick={() => showDeleteModal(item.id)} /> */}
                        <Delete className="warehouse__list__row-item-delete-icon" alt="Delete" onClick={() => showDeleteModal(item)} />
                        <Link to={`/warehouses/edit-warehouse/${item.id}`}>
                            <Edit className="warehouse__list__row-item-edit-icon" alt="Edit" onClick={() => onEdit(item)} />
                        </Link>
                    </div>
                </div>
            ));

            content = (
                <div className='warehouse__list__tab-pad'>

                    <section className='warehouse__list__tab-header'>
                        <div className='warehouse__list__tab-flex'>
                            <h1 className='warehouse__list__tab-header-title'>Warehouses</h1>
                            <div className='warehouse__list__tab-header-search'>
                                <input className='warehouse__list__tab-header-input' placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
                                <div className='warehouse__list__tab-header-container'>
                                    <Search className="warehouse__list__header-icon" />
                                </div>
                            </div>
                            <div className='warehouse__list__tab-add'>
                                <button className='warehouse__list__tab-add-button' onClick={() => navigate('/warehouses/add-warehouse')} >+ Add New Warehouse</button>
                            </div>
                        </div>
                        <section className="warehouse__list__tab-header-row">
                            <div className="warehouse__list__tab-item1">
                                <div className="warehouse__list__tab-itemf">
                                    WAREHOUSE
                                    <Unfold className="warehouse__list__tab-sort-icon" />
                                </div>
                                <div className="warehouse__list__tab-itemf">
                                    ADDRESS
                                    <Unfold className="warehouse__list__tab-sort-icon" />
                                </div>
                            </div>
                            <div className="warehouse__list__tab-item1">
                                <div className="warehouse__list__tab-item-contact-name">
                                    CONTACT NAME
                                    <Unfold className="warehouse__list__tab-sort-icon" />
                                </div>
                                <div className="warehouse__list__tab-item-contact-info">
                                    CONTACT INFORMATION
                                    <Unfold className="warehouse__list__tab-sort-icon" />
                                </div>
                            </div>
                            <div className="warehouse__list__tab-item-actions">
                                ACTIONS
                            </div>
                        </section>
                    </section>
                    {itemsDesk}
                    {backdrop}
                    <DeleteWarehouse
                        name={itemId.current.warehouse_name}
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
