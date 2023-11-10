import './WList.scss'
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg'
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg'
import { useState, useEffect } from 'react';
import axios from "axios";


function Wlist() {
    const [data, setData] = useState([])
    const [searchData, setSearchData] = useState([])


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        async function getWareHouseData() {
            try {
                const response = await axios.get("http://localhost:8086/api/warehouses");
                setData(response.data);
                setSearchData(response.data);
                console.log("response.data ", response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getWareHouseData();
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Set up event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    function showDeleteModal(itemId) { }

    function onSearch(searchText) { }

    if (data.length > 0) {
        if (isMobile) {
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

            return (
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
                </div>
            );
        } else {
            return (<div>Desktop view</div>);
        }
    } else {
        return <div>No data</div>;
    }

    // return content;
}

export default Wlist;