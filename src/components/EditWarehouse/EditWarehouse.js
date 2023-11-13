import "./EditWarehouse.scss";
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as ErrorIcon } from '../../images/error_black_24dp.svg';


function EditWarehouse() {
    const { id } = useParams();
    const nav = useNavigate();
    const backendApiURL = 'http://localhost:8081';
    const navigate = useNavigate();
    const [firstRender, setFirstRender] = useState(true);
    const [warehouseName, setWarehouseName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contact, setContact] = useState('');
    const [position, setPosition] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const errorMessage = "This field is required";


    const validatePhoneNumber = (number) => {
        const validFormat = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        return validFormat.test(number);
    }
    const validateEmail = (email) => {
        const validFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validFormat.test(email);
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${backendApiURL}/api/warehouses/${id}`);

                setWarehouseName(response.data.warehouse_name);
                setAddress(response.data.address);
                setCity(response.data.city);
                setCountry(response.data.country);
                setContact(response.data.contact_name);
                setPosition(response.data.contact_position)
                setPhoneNumber(response.data.contact_phone);
                setEmail(response.data.contact_email)
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        }
        fetchData();
    }, []);

    const changeWarehouseName = (event) => {
        setWarehouseName(event.target.value);
    }

    const changeAddress = (event) => {
        setAddress(event.target.value);
    }

    const changeCity = (event) => {
        setCity(event.target.value);
    }

    const changeCountry = (event) => {
        setCountry(event.target.value);
    }

    const changeContact = (event) => {
        setContact(event.target.value);
    }

    const changePosition = (event) => {
        setPosition(event.target.value);
    }

    const changeNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }


    const handleUpload = (e) => {
        e.preventDefault();

setFirstRender(false);
        
        if (!warehouseName || !address || !city || !country || !contact || !phoneNumber || !email || !position) {
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            alert('Please enter a valid phone number');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email');
            return;
        }

        const editFormat = {
            warehouse_name: warehouseName,
            address,
            city,
            country,
            contact_name: contact,
            contact_position: position,
            contact_phone: phoneNumber,
            contact_email: email
        }

        async function edit() {
            try {
                const response = await axios.put(`${backendApiURL}/api/warehouses/${id}`, editFormat);
                alert('Warehouse updated!');
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        }

        edit();
    };

    function onCancel() {
        nav(-1);
    }



    return (
        <main>
            <section className="header-layout">
                <div className="edit-warehouse__title">
                    <BackArrow className='inventory-item__edit-icon' alt='A blue arrow on a white background' onClick={() => navigate('/')} />
                    <h1 className="edit-warehouse__title-text">Edit Warehouse</h1>
                </div>
                <div className="edit-warehouse">
                    <form noValidate onSubmit={handleUpload} >
                        <section className="edit-warehouse__layout">
                            <div className="edit-warehouse__form-one">
                                <h3 className="edit-warehouse__h3">Warehouse Details</h3>
                                <label className="edit-warehouse__labels" for="warehouseName">
                                    Warehouse Name
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="warehouseName"
                                        name="warehouseName"
                                        placeholder="Warehouse Name"
                                        onChange={changeWarehouseName}
                                        value={warehouseName}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${warehouseName ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="streetAddress">
                                    Street Address
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="streetAddress"
                                        name="streetAddress"
                                        placeholder="Street Address"
                                        onChange={changeAddress}
                                        value={address}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${address ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="city">
                                    City
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        onChange={changeCity}
                                        value={city}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${city ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="country">
                                    Country
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="Country"
                                        onChange={changeCountry}
                                        value={country}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${country ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                            </div>
                            <div className="edit-warehouse__form-two">
                                <h3 className="edit-warehouse__h3">Contact Details</h3>
                                <label className="edit-warehouse__labels" for="contactName">
                                    Contact Name
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="contactName"
                                        name="contactName"
                                        placeholder="Contact Name"
                                        onChange={changeContact}
                                        value={contact}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${contact ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="position">
                                    Position
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="position"
                                        name="position"
                                        placeholder="Position"
                                        onChange={changePosition}
                                        value={position}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${position ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="phoneNumber">
                                    Phone Number
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        onChange={changeNumber}
                                        value={phoneNumber}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${phoneNumber ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                                <label className="edit-warehouse__labels" for="email">
                                    Email
                                    <input
                                        className="edit-warehouse__inputs"
                                        type="text"
                                        id="Email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={changeEmail}
                                        value={email}
                                    />
                                    <div
                                        className={`${firstRender ? "first-render" : "default-render"} ${email ? "default" : "error-message"
                                            }`}
                                    >
                                        <ErrorIcon
                                            className="edit-warehouse__error-icon"
                                            alt="white exclamation point on a red background"
                                        />
                                        <span>{`${errorMessage}`}</span>
                                    </div>
                                </label>
                            </div>
                        </section>
                        <section className="edit-btn">
                            <button className="edit-btn__white" type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="edit-btn__indigo"> Save</button>
                        </section>
                    </form>
                </div>
            </section >
        </main>
    );
}
export default EditWarehouse;