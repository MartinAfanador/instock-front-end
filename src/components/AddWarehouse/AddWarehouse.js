import "./AddWarehouse.scss";
// import arrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import { useState } from "react";
import { ReactComponent as BackArrow } from '../../images/arrow_back_black_24dp.svg';
import { ReactComponent as ErrorIcon } from '../../images/error_black_24dp.svg';
import axios from 'axios';

function AddWarehouse() {
  const [firstRender, setFirstRender] = useState(true);
  const [warehouseName, setWarehouseName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [contact, setContact] = useState(null);
  const [position, setPosition] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const errorMessage = "This field is required";
  
  const handleWarehouseName = (event) => {
    setWarehouseName(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleCity = (event) => {
    setCity(event.target.value);
  };
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleName = (event) => {
    setContact(event.target.value);
  };
  const handlePosition = (event) => {
    setPosition(event.target.value);
  };
  const handleNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = async () => {
    setFirstRender(false);
    try {
      const response = await axios.post('/api/warehouses', {
        warehouse_name: warehouseName,
        address,
        city,
        country,
        contact_name: contact,
        contact_position: position,
        contact_phone: phoneNumber,
        contact_email: email,
      });

    //   console.log('Warehouse added successfully:', response.data);


      
    } catch (error) {
      if (error.response) {
        console.error('Error from the server:', error.response.data);
      } else if (error.request) {
        console.error('Error making the request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      console.log(handleSubmit);
    }
  };
  return (
    <section>
      <div className="warehouse__title">
      <BackArrow className='warehouse__title-icon' alt='A blue arrow on a white background' />
        <h1 className="warehouse__title-text">Add New Warehouse</h1>
      </div>
      <div className="warehouse">
        <form className="warehouse__form1">
          <h3 className="warehouse__h3">Warehouse Details</h3>
          <label className="warehouse__labels" htmlFor="myinput">
            Warehouse Name
            <input
              className="warehouse__inputs"
              onChange={handleWarehouseName}
              name="warehouseName"
              type="text"
              id="Warehouse Name"
              placeholder="Warehouse Name"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                warehouseName ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            Street Address
            <input
              className="warehouse__inputs"
              onChange={handleAddress}
              type="text"
              id="Street Address"
              placeholder="Street Address"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                address ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            City
            <input
              className="warehouse__inputs"
              onChange={handleCity}
              type="text"
              id="City"
              placeholder="City"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                city ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            Country
            <input
              className="warehouse__inputs"
              onChange={handleCountry}
              type="text"
              id="Country"
              placeholder="Country"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                country ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
        </form>
        <form className="warehouse__form2">
          <h3 className="warehouse__h3">Contact Details</h3>
          <label className="warehouse__labels" htmlFor="myinput">
            Contact Name
            <input
              className="warehouse__inputs"
              onChange={handleName}
              type="text"
              id="Contact Name"
              placeholder="Contact Name"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                contact ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            Position
            <input
              className="warehouse__inputs"
              onChange={handlePosition}
              type="text"
              id="Position"
              placeholder="Position"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                position ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            Phone Number
            <input
              className="warehouse__inputs"
              onChange={handleNumber}
              type="text"
              id="Phone Number"
              placeholder="Phone Number"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                phoneNumber ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
          <label className="warehouse__labels" htmlFor="myinput">
            Email
            <input
              className="warehouse__inputs"
              onChange={handleEmail}
              type="text"
              id="Email"
              placeholder="Email"
            />
            <div
              className={`${firstRender ? "first-render" : "default-render"} ${
                email ? "default" : "error-message"
              }`}
            >
              <ErrorIcon
                className="warehouse__error-icon"
                alt="white exclamation point on a red background"
              />
              <span>{`${errorMessage}`}</span>
            </div>
          </label>
        </form>
      </div>
      <section className="btn">
        <button className="btn__white">cancel</button>
        <button className="btn__indigo" onClick={handleSubmit}>
          {" "}
          + Add Warehouse
        </button>
      </section>
    </section>
  );
}
export default AddWarehouse;