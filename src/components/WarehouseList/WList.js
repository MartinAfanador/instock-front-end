import './WList.scss'
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg'
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg'
import { ReactComponent as Chevron } from '../../images/chevron_right_black_24dp.svg'
import { useState, useEffect } from 'react';
import axios from "axios";

import DeleteWarehouse from '../../pages/DeleteWarehouse/DeleteWarehouse';
import { Link } from 'react-router-dom';


function Wlist() {
    const [data, setData] = useState()
    // A copy of data list, used for filteration
    const [searchData, setSearchData] = useState()

    // Exeecuted once, it will fetch all warehouse list from server
    useEffect(() => {
        async function getWareHouseData() {
            try {
                const response = await axios.get("http://localhost:8086/api/warehouses");
                // intially the search data nd server response date are same
                setData(response.data);
                setSearchData(response.data);
                console.log("response.data ", response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getWareHouseData();
    }, []);

    function onSearch(searchText) { }

    function showDeleteModal(id) {

    }
    // function onDeleteModalConfirmed() {
    //     console.log(itemId.value);

    //     const itemIdValue = itemId.value
    //     const searchItems = searchData.filter(item => item.id !== itemIdValue);
    //     setSearchData(searchItems);

    //     // async function deleteItem() {
    //     //     try {
    //     //         const response = await axios.delete(`http://localhost:8086/api/warehouses/${itemId.value}`);
    //     //         console.log("response.delete ", response.data);
    //     //     } catch (error) {
    //     //         console.error(error);
    //     //     }
    //     // }
    //     // deleteItem();
    //     setShouldShowDeleteModal(false);
    // }

    if (data) {


        const items = searchData.map(item => {
            return (
                <>
                    <form className='warehouse__list' key={item.id}>

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
                                <Link to={`/delete-warehouse/${item.id}`}>
                                    <Delete className='warehouse__list__actions-delete' onClick={() => showDeleteModal(item.id)} />
                                </Link>
                                <Edit className='warehouse__list__actions-edit' />
                            </div>
                        </section>
                    </form>
                    {/* {modal} */}
                </>
            );
        });

        return (
            <div className='warehouse__list'>

                <section className='warehouse__list__header'>
                    <h1 className='warehouse__list__header-title'>Warehouses</h1>
                    <div className='warehouse__list__header-search'>
                        {/*onChange is called everytime user udpates the search input and user input will be passed to onSearch function  */}
                        <input className='warehouse__list__header-input' placeholder='Search' onChange={(e) => onSearch(e.target.value)} />
                    </div>
                    <div className='warehouse__list__header-add'>
                        <button className='warehouse__list__header-add-button' type="submit">+ Add New Warehouse</button>
                    </div>
                </section>
                {items}
            </div>
        );
    } else {
        return <div> NO data</div>
    }

};

export default Wlist