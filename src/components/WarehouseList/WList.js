import './WList.scss'
import { ReactComponent as Delete } from '../../images/delete_black_24dp.svg'
import { ReactComponent as Edit } from '../../images/edit_black_24dp.svg'
import { useState, useEffect } from 'react';
import axios from "axios";


function Wlist() {
    const [data, setData] = useState()

    useEffect(() => {
        async function getWareHouseData() {
            try {
                const response = await axios.get("http://localhost:8086/api/warehouses");
                setData(response.data);
                console.log("response.data ", response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getWareHouseData();
    }, []);

    if (data) {
        // const dataNum = [11, 2, 3, 5].map(item => <h1>{item}</h1>);

        const items = data.map(item => {
            return (
                <form className='warehouse__list'>

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
                            <Delete className='warehouse__list__actions-delete' />
                            <Edit className='warehouse__list__actions-edit' />
                        </div>
                    </section>
                </form>
            );
        });

        return (
            <div className='warehouse__list'>
                {/* {dataNum} */}
                <section className='warehouse__list__header'>
                    <h1 className='warehouse__list__header-title'>Warehouses</h1>
                    <div className='warehouse__list__header-search'>
                        <input className='warehouse__list__header-input' placeholder='Search' />
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