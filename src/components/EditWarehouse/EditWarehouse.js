import "./EditWarehouse.scss";
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditWarehouse() {
    const { id } = useParams();
    const nav = useNavigate();
    const backendApiURL = 'http://localhost:8081';
    const navigate = useNavigate();
    const [warehouseDetails, setWarehouseDetails] = useState({
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contactName: '',
        position: '',
        phoneNumber: '',
        email: ''
    });


    useEffect(() => {
        async function fetchData() {
            // console.log(`${backendApiURL}/api/warehouses/${id}`);
            try {
                // console.log(`${backendApiURL}/api/warehouses/${id}`);
                const response = await axios.get(`${backendApiURL}/api/warehouses/${id}`);
                console.log(response.data);
                setWarehouseDetails(response.data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        fetchData();
    }, []);

    const handleUpload = (e) => {
        e.preventDefault();
        const warehouse_name = e.target.warehouseName.value;
        const address = e.target.streetAddress.value;
        const city = e.target.city.value;
        const country = e.target.country.value;
        const contactName = e.target.contactName.value;
        const position = e.target.position.value;
        const phoneNumber = e.target.phoneNumber.value;
        const email = e.target.email.value;

        const editFormat = {
            warehouse_name,
            address,
            city,
            country,
            contactName,
            position,
            phoneNumber,
            email
        }

        async function edit() {
            // console.log("edit called ");
            const response = await axios.put(`http://localhost:8086/edit-warehouse/:id`, editFormat);
        }
        edit();

    };

    function onCancel() {
        nav(-1);
    }



    return (
        <>
            <section>
                <div className="warehouse__title">
                    <BackArrow className='inventory-item__edit-icon' alt='A blue arrow on a white background' onClick={() => navigate('/')}/>
                    <h1 className="warehouse__title-text">Edit Warehouse</h1>
                </div>
                <div className="warehouse">
                    <form noValidate onSubmit={handleUpload} >
                        <section className="warehouse__layout"> 
                        <div className="warehouse__form1">
                            <h3 className="warehouse__h3">Warehouse Details</h3>
                            <label className="warehouse__labels" for="warehouseName">
                                Warehouse Name
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="warehouseName"
                                    name="warehouseName"
                                    placeholder="Warehouse Name"
                                    value={warehouseDetails.warehouse_name}
                                />
                            </label>
                            <label className="warehouse__labels" for="streetAddress">
                                Street Address
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="streetAddress"
                                    name="streetAddress"
                                    placeholder="Street Address"
                                    value={warehouseDetails.address}
                                />
                            </label>
                            <label className="warehouse__labels" for="city">
                                City
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="City"
                                />
                            </label>
                            <label className="warehouse__labels" for="country">
                                Country
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                />
                            </label>
                        </div>
                        <div className="warehouse__form2">
                            <h3 className="warehouse__h3">Contact Details</h3>
                            <label className="warehouse__labels" for="contactName">
                                Contact Name
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    placeholder="Contact Name"
                                />
                            </label>
                            <label className="warehouse__labels" for="position">
                                Position
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="Position"
                                />
                            </label>
                            <label className="warehouse__labels" for="phoneNumber">
                                Phone Number
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                />
                            </label>
                            <label className="warehouse__labels" for="email">
                                Email
                                <input
                                    className="warehouse__inputs"
                                    type="text"
                                    id="Email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </label>
                        </div>
                        </section>
                        <section className="btn">
                            <button className="edit-btn__white" type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="edit-btn__indigo"> Save</button>
                        </section>
                    </form>
                </div>
            </section >
        </>
    );
}
export default EditWarehouse;