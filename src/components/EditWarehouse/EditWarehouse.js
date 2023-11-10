import "./EditWarehouse.scss";
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { useState } from "react";
import axios from 'axios';

function EditWarehouse() {
    const [warehouseDetails, setWarehouseDetails] = useState({
        warehouseName: '',
        streetAddress: '',
        city: '',
        country: '',
        contactName: '',
        position: '',
        phoneNumber: '',
        email: ''
    });


    const handleUpload = (e) => {
        e.preventDefault();
        const warehouseName = e.target.warehouseName.value;
        const streetAddress = e.target.streetAddress.value;
        const city = e.target.city.value;
        const country = e.target.country.value;
        const contactName = e.target.contactName.value;
        const position = e.target.position.value;
        const phoneNumber = e.target.phoneNumber.value;
        const email = e.target.email.value;

        const editFormat = {
            warehouseName,
            streetAddress,
            city,
            country,
            contactName,
            position,
            phoneNumber,
            email
        }

        async function edit() {
            const response = await axios.put(`http://localhost:8081/edit-warehouse/:id`, editFormat);
        }
        edit();

    };


    return (
        <>
            <section>
                <div className="warehouse__title">
                    <BackArrow className='inventory-item__edit-icon' alt='A blue arrow on a white background' />
                    <h1 className="warehouse__title-text">Edit Warehouse</h1>
                </div>
                <div className="warehouse">
                    <form noValidate onSubmit={handleUpload}>
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
                        <section className="btn">
                            <button className="btn__white">Cancel</button>
                            <button type="submit" className="btn__indigo"> Save</button>
                        </section>
                    </form>
                </div>
            </section>
        </>
    );
}
export default EditWarehouse;