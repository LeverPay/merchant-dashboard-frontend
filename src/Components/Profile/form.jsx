import React, { useState, useRef, useContext, useLayoutEffect } from "react";
import Button from "../General/Button component/Button";
import PhoneInput, {
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import Select from "react-select";
import TokenContext from "../User-Token/TokenContext";
import { get_Merchant_Profile, baseUrl } from "../Endpoints";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CountrySelect } from "../CountrySelect";

export default function Form() {
  const { userToken, userData, setUserData, notify } = useContext(TokenContext);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState(null);
  const [Input, setInput] = useState({
    firstName: "",
    lastName: "",
    businuessName: null,
    country: null,
    image: "",
    address: "",
    password: "",
    email: "",
  });
  const [countryData, setCountryData] = useState([]);
  const [countryValue, setCountryValue] = useState();
  const [selectCountry, setSelectCountry] = useState("");
  const [countryString, setCountryString] = useState();

  const [Image, setImage] = useState(null);

  const [ReadOnly, setReadOnly] = useState(true);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  // Get profile request on server
  const getProfile = async () => {
    try {
      const request = await axios.get(baseUrl + get_Merchant_Profile, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
      console.log(request);
      if (request.status === 200) {
        const data = request.data.data;
        //save user data for use somewhere else
        setUserData(data);
        console.log(userData);
        setInput((prev) => {
          return {
            ...prev,
            firstName: data.first_name,
            lastName: data.last_name,
          };
        });
        setPhone(data.phone);
        setImage(data.passport);
        setCountry(data.country_id);
      }
    } catch (err) {
      console.log(err);
      notify("something went wrong, can't get your data at this time :(");
    }
  };

  // Call country APi
  const _country = "/api/v1/get-countries";
  const getCountry = async (country_id) => {
    const request = await axios.get(baseUrl + _country);
    if (request.status === 200) {
      setCountryData(request.data);
    }

    // Logic to display country name on select placeholder
    if (countryData !== undefined) {
      const list = countryData.data;
      const country_Value = list?.filter((el, i) => country === el.id);
      setCountryValue(country_Value);
      console.log(country_Value, list);
    }
  };

  useEffect(() => {
    if (selectCountry !== "") {
      getCountry(selectCountry);
    }
  }, [selectCountry]);

  const formCountry = (country_id) => {
    if (countryData !== undefined) {
      setSelectCountry(country_id);
      console.log(`id: ${country_id}`);
    }
  };
  // Make request run once on page load
  useLayoutEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getCountry();
  }, [Input]);

  // Get name value for Id returned on api request
  useEffect(() => {
    if (countryValue !== undefined) {
      const countryName = countryValue.map((el) => el.country_name).toString();
      console.log(countryName);
      setCountryString(countryName);
    }
  }, [countryValue]);

  // useEffect(() => {
  //   if (countryData !== undefined) {
  //     const country_Value = countryData.filter((el, i) => country === el.id);
  //     setCountryValue(country_Value);
  //     console.log(country_Value);
  //   }
  //   console.log(countryValue);
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // const countryOptions = Object.keys(countries).map((code) => ({
  //   value: code,
  //   label: countries[code].name,
  // }));

  // const handleCountryChange = (value) => {
  //   setCountry(value);
  // };

  const editInfo = () => {
    setReadOnly(false);
    console.log(ref1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Input.firstName !== "" && Input.lastName !== "") {
      console.log(Input.firstName, Input.lastName);
    }

    if (Input.businuessName !== "" || Input.businuessName !== null) {
      console.log(Input.businuessName);
    }

    // if (country !== null) {
    //   console.log(country.label);
    // }
    if (selectCountry === "") {
      console.log(country);
    } else {
      console.log(selectCountry);
    }

    if (
      isValidPhoneNumber(phone) &&
      isPossiblePhoneNumber(phone) &&
      phone !== ""
    ) {
      console.log(phone);
    }

    if (Image) {
      console.log(Image);
    }

    setReadOnly(true);
  };

  const discardChanges = (e) => {
    e.preventDefault();

    window.location.reload();
  };

  const handleDivClick = () => {
    if (!ReadOnly) {
      const input = document.createElement("input");
      input.type = "file";
      input.style.zIndex = "5";
      input.accept = "image/x-png,image/jpeg,/image/jpg";
      input.onchange = changeImage;
      input.click();
    }
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <>
      <section className="profile-edit d-flex justify-content-around align-items-center">
        <div className="profile-img rounded-circle" onClick={handleDivClick}>
          <img
            className={`rounded-circle ${!ReadOnly ? `opacity-75 cursor` : ``}`}
            src={!Image ? require("../../Assets/user's image.png") : Image}
            alt=""
          />
        </div>

        {/* Allows user to change information on the database  */}
        <Button
          style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
          click={editInfo}
        >
          Change
          <img
            className="mx-2"
            src={require("../../Assets/Edit-btn.svg").default}
            alt=""
          />
        </Button>

        <Button
          style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}
          click={removeImage}
        >
          Remove
          <img
            className="mx-2"
            src={require("../../Assets/Delete-btn.svg").default}
            alt=""
          />
        </Button>
      </section>

      <form action="">
        <div className="mt-2 py-2 d-flex flex-column">
          <label htmlFor="Firstname">First Name</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="text"
              name="firstName"
              value={Input.firstName}
              onChange={handleChange}
              ref={ref1}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="Lastname">Last Name</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="text"
              name="lastName"
              value={Input.lastName}
              onChange={handleChange}
              ref={ref2}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="Businuess-name">Businuess Name</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="text"
              name="businuessName"
              value={Input.businuessName}
              onChange={handleChange}
              ref={ref3}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="address">Address</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="text"
              name="address"
              value={Input.address}
              onChange={handleChange}
              ref={ref3}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="email">E-mail</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="email"
              name="email"
              value={Input.email}
              onChange={handleChange}
              ref={ref3}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column">
          <label htmlFor="password">password</label>

          <div className="">
            <input
              className="rounded-1 text-input"
              type="password"
              name="password"
              value={Input.password}
              onChange={handleChange}
              ref={ref3}
              readOnly={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="Country" className="rounded-1">
            Country
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={countryData}
              selector="country_name"
              callback={formCountry}
              value={
                selectCountry === ""
                  ? null
                  : { label: selectCountry, value: selectCountry }
              }
              placeholder={countryString ? countryString : "Choose an option"}
              disabled={ReadOnly}
            />
            {/* <Select
              options={countryOptions}
              className="select-btn rounded-1"
              value={country}
              onChange={handleCountryChange}
              isDisabled={ReadOnly}
            /> */}
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="State" className="rounded-1">
            State
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={countryData}
              selector="country_name"
              callback={formCountry}
              value={
                selectCountry === ""
                  ? null
                  : { label: selectCountry, value: selectCountry }
              }
              placeholder={countryString ? countryString : "Choose an option"}
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="city" className="rounded-1">
            City
          </label>

          <div className="items text-input rounded-1">
            <CountrySelect
              countyList={countryData}
              selector="country_name"
              callback={formCountry}
              value={
                selectCountry === ""
                  ? null
                  : { label: selectCountry, value: selectCountry }
              }
              placeholder={countryString ? countryString : "Choose an option"}
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="mt-1 py-2 d-flex flex-column" id="options">
          <label htmlFor="Country" className="rounded-1">
            Phone Number
          </label>

          <div className="items">
            <PhoneInput
              international
              value={phone}
              onChange={(val) => setPhone(val)}
              className="select-btn rounded-1"
              disabled={ReadOnly}
            />
          </div>
        </div>

        <div className="d-flex mt-5 justify-content-center align-items-center">
          {/* Discard changes, fetch information from database and make forms on page readOnly */}

          <Button
            style={{ backgroundColor: "#ebebeb", color: "#2962f2" }}
            click={discardChanges}
          >
            Discard Changes
          </Button>

          {/* performs a post and get request on the database to update database and render information on the client */}
          <Button
            style={{ backgroundColor: "#2962f2", color: "#ffffff" }}
            click={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
}
