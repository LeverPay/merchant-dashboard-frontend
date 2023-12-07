import React, { useContext } from "react";
import "./style.css";
import Button from "../General/Button component/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRef } from "react";
import NotificationContext from "../General/NotificationContext";
import Confirm from "./confirm";
import Success from "./Success";
import TokenContext from "../User-Token/TokenContext";
import Cancel from "./cancel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  baseUrl,
  create_invoice,
  get_invoice,
} from "../../Components/Endpoints";
import CryptoJS from "crypto-js";

export default function GenerateInvoice() {
  const { notification, setNotification } = useContext(NotificationContext);
  const {
    success: alert,
    notify,
    userData,
    setUserData,
  } = useContext(TokenContext);
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [token, setToken] = useState("");
  const [backBtnClicked, setBackbtnClicked] = useState(false);
  const [cancelBtnClicked, setCancelBtnClicked] = useState(false);
  const [confirmBtnClicked, setConfirmBtnClicked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [inputVal, setInputVal] = useState({
    reason: "",
    transactionID: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [input, setInput] = useState({
    productName: "",
    qty: "",
    discount: "",
    price: "",
    totalPrice: "",
    description: "",
    customerEmail: "",
    currency: "",
    vat: "0",
  });

  const warningMsg1 = useRef(),
    warningMsg2 = useRef(),
    warningMsg3 = useRef(),
    warningMsg4 = useRef(),
    warningMsg5 = useRef(),
    total = useRef(),
    price = useRef();

  const cancelInvoiceAction = (e) => {
    e.preventDefault();
    setCancel(true);
    setConfirmBtnClicked(true);

    if (confirmBtnClicked && inputVal.reason === "") {
      notify("No reason given");
    } else if (confirmBtnClicked && inputVal.transactionID === "") {
      notify("TransactionID field empty");
    } else {
      if (
        confirmBtnClicked &&
        inputVal.reason !== "" &&
        !backBtnClicked &&
        inputVal.transactionID !== ""
      ) {
        console.log(inputVal.reason);
        setSuccess(true);
        setTimeout(() => {
          // setGenerateInvoice(false);
          alert("Invoice cancellation successful");
        }, 3000);
        setTimeout(() => window.location.reload(), 5000);
      }
    }
  };

  // const cancelInvoice = (e) => {
  //   e.preventDefault();
  //   setCancelBtnClicked(true);
  //   setBackbtnClicked(false);
  //   if (cancelBtnClicked) cancelInvoiceAction(e);
  // };

  const navigate = useNavigate();
  const cancelInvoice = (e) => {
    e.preventDefault();
    setTimeout(() => navigate("/dashboard"), 3000);
  };

  const hideForm = () => {
    setBackbtnClicked(true);
    setCancel(false);
  };

  const toggleErr1 = () => {
    if (input.productName !== "") {
      if (!warningMsg1.current?.classList?.contains("hidden")) {
        warningMsg1.current?.classList?.add("hidden");
      }
    } else {
      warningMsg1.current?.classList?.remove("hidden");
    }
  };

  const toggleErr2 = () => {
    if (input.qty !== "") {
      if (!warningMsg2.current?.classList?.contains("hidden")) {
        warningMsg2.current?.classList?.add("hidden");
      }
    } else {
      warningMsg2.current?.classList?.remove("hidden");
    }
  };

  const toggleErr3 = () => {
    if (input.price !== "") {
      if (!warningMsg3.current?.classList?.contains("hidden")) {
        warningMsg3.current?.classList?.add("hidden");
      }
    } else {
      warningMsg3.current?.classList?.remove("hidden");
    }
  };

  const toggleErr4 = () => {
    if (input.description !== "") {
      if (!warningMsg4.current?.classList?.contains("hidden")) {
        warningMsg4.current?.classList?.add("hidden");
      }
    } else {
      warningMsg4.current?.classList?.remove("hidden");
    }
  };

  const toggleErr5 = () => {
    if (input.customerEmail !== "") {
      if (!warningMsg5.current?.classList?.contains("hidden")) {
        warningMsg5.current?.classList?.add("hidden");
      }
    } else {
      warningMsg5.current?.classList?.remove("hidden");
    }
  };

  useEffect(() => {
    const vat = parseFloat(input.vat) / 100;
    const discount =
      input.discount === "" ? 0 : parseFloat(input.discount) / 100;
    let final;

    if (input.price !== "") {
      const currentPrice = parseFloat(input.price);
      const vatPrice = currentPrice * vat;
      const finalVatPrice = currentPrice + vatPrice;
      const discountPrice = parseFloat(finalVatPrice * discount);
      final = finalVatPrice - discountPrice;

      // Display message
      if (total.current?.classList?.contains("hidden")) {
        total.current?.classList?.remove("hidden");
      }
      setInput((prev) => ({
        ...prev,
        totalPrice:
          input.vat === "" || input.vat < 0
            ? "invalid price"
            : final.toFixed(2),
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        totalPrice: "",
      }));

      if (!total.current?.classList?.contains("hidden")) {
        total.current?.classList?.add("hidden");
      }
    }
  }, [input.vat, input.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value;
    if (name === "qty" || name == "price") {
      numericValue = value.replace(/[^0-9]/g, "");
    }
    setInput((prev) => ({ ...prev, [name]: numericValue }));
  };

  const vatRegex = /^[0-9]*\.?[0-9]*$/;
  const validate = () => {
    if (input.productName !== "") {
      if (!warningMsg1.current?.classList?.contains("hidden")) {
        warningMsg1.current?.classList?.add("hidden");
      }
    } else {
      warningMsg1.current?.classList?.remove("hidden");
    }

    if (input.qty !== "") {
      if (!warningMsg2.current?.classList?.contains("hidden")) {
        warningMsg2.current?.classList?.add("hidden");
      }
    } else {
      warningMsg2.current?.classList?.remove("hidden");
    }

    if (input.vat === "") {
      notify("Vat cannot be empty add 0 instead");
    } else if (input.vat < 0) {
      notify("invalid vat field! use a positive value");
    } else {
    }

    if (input.price !== "") {
      if (!warningMsg3.current?.classList?.contains("hidden")) {
        warningMsg3.current?.classList?.add("hidden");
      }
    } else {
      warningMsg3.current?.classList?.remove("hidden");
    }

    if (input.description !== "") {
      if (!warningMsg4.current?.classList?.contains("hidden")) {
        warningMsg4.current?.classList?.add("hidden");
      }
    } else {
      warningMsg4.current?.classList?.remove("hidden");
    }

    if (input.customerEmail !== "") {
      if (!warningMsg5.current?.classList?.contains("hidden")) {
        warningMsg5.current?.classList?.add("hidden");
      }
    } else {
      warningMsg5.current?.classList?.remove("hidden");
    }

    if (input.customerEmail !== "" && !emailRegex.test(input.customerEmail)) {
      notify("Invalid mail format");
    }

    if (vatRegex.test(input.vat)) {
    } else {
      notify("Vat price is invalid");
    }
  };

  const newNotification = () => {
    const id = notification.length + 1;
    const message = `Invoice sent to ${input.customerId}`;
    const read = false;
    const newItem = {
      id,
      message,
      read,
    };

    setNotification((prev) => [...prev, newItem]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (input.currency !== "") {
      if (
        input.description !== "" &&
        input.price !== "" &&
        input.productName !== "" &&
        input.customerEmail !== "" &&
        emailRegex.test(input.customerEmail) &&
        input.vat !== "" &&
        input.vat >= 0
        // &&
        // input.totalPrice !== ""
      ) {
        createInvoice();
        console.log(input, token);
        clearInput();
        newNotification();
      }
    } else {
      notify("Please Select a currency");
    }
  };

  const clearInput = () => {
    setInput((prev) => ({
      ...prev,
      productName: "",
      qty: "",
      price: "",
      discount: "",
      customerId: "",
      totalPrice: "",
      description: "",
      currency: "",
      vat: "0",
      customerEmail: "",
    }));
  };

  const getCurrency = async () => {
    try {
      const req = await axios.get(baseUrl + "/api/v1/user/get-currencies", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
        },
      });
    } catch (err) {}
  };

  const createInvoice = async () => {
    try {
      setAnimate(true);
      const req = await axios.post(
        baseUrl + create_invoice,
        {
          product_name: input.productName,
          price: input.price,
          product_description: input.description,
          email: input.customerEmail,
          vat: input.vat,
          currency: input.currency,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
          },
        }
      );
      if (req.status === 200) {
        const data = req.data;
        setAnimate(false);
        alert(req.data.message);
        setSuccess(true);
      } else {
      }
    } catch (err) {
      setAnimate(false);
      if (err.response) {
        console.log(err);
        notify(err.response.data?.message);
      } else if (err.data) {
        notify(err.data.message);
      } else {
        notify("Something went wrong :(");
      }
    }
  };

  // // decrypy data on local storage for use
  // const getData = () => {
  //   const _key = sessionStorage.getItem("Name");
  //   const encryptedData = sessionStorage.getItem("dx");
  //   const decrypt = CryptoJS?.AES?.decrypt(encryptedData, _key);
  //   const val = decrypt.toString(CryptoJS?.enc?.Utf8);
  //   const data = JSON.parse(val);
  //   setUserData(data);
  // };

  useEffect(() => {
    // getData();
    getCurrency();
  }, []);

  // // console.log(_v);
  // useEffect(() => {
  //   createInvoice();
  // }, []);

  // const verifyInvoice = (e) => {
  //   e.preventDefault();
  //   validate();
  //   if (
  //     input.productName !== "" &&
  //     input.qty !== "" &&
  //     input.price !== "" &&
  //     input.description !== "" &&
  //     input.customerId !== ""
  //   ) {
  //     setSuccess(true);
  //   }
  // };

  return (
    <section className="invoice p-2 px-4">
      <div className="d-flex justify-content-between icon-container">
        <div className="mt-2 text-icon">
          <AiFillPlusCircle size="25px" className="text-primary" />{" "}
          <span className="mx-2 fw-light">Generate Invoice</span>
        </div>

        <div className="company-logo">
          <img src={require("../../Assets/vector.png")} alt="company-logo" />
        </div>
      </div>
      <form className="form container mx-4 position-relative" action="">
        <div className="container form-group mt-5">
          <label htmlFor="Product-name" className="label fw-bolder">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={input.productName}
            onChange={handleChange}
            onInput={toggleErr1}
            id="product-name"
          />
          <small ref={warningMsg1} className="warning hidden">
            This field is required
          </small>
        </div>
        <div className="container d-flex flex-column form-group mt-2 d-flex">
          <h5>Select Currency</h5>

          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="currency"
              onChange={handleChange}
              value="naira"
              checked={input.currency === "naira"}
              id="currency"
            />
            <label
              htmlFor="currency"
              id="currency"
              className="form-check-label"
            >
              Naira
            </label>
          </div>
          <div className="form-check mt-3">
            <input
              type="radio"
              className="form-check-input"
              name="currency"
              value="dollar"
              checked={input.currency === "dollar"}
              onChange={handleChange}
              id="currency1"
            />
            <label
              htmlFor="currency1"
              id="currency1"
              className="form-check-label"
            >
              Dollar
            </label>
          </div>
        </div>
        <div className="container form-group mt-2">
          <label htmlFor="Discount" className="label fw-bolder" id="vat">
            VAT
          </label>
          <input
            type="number"
            pattern="^[0-9]*\.?[0-9]*$"
            placeholder="Enter a positive number (This field is optional)"
            className="form-control"
            name="vat"
            value={input.vat}
            onChange={handleChange}
            id="vat"
            title="Please enter a positive number"
            // onInput={toggleErr3}
          />
        </div>{" "}
        <div className="mt-2 px-3">
          <div className="d-lg-flex align-items-center price-container">
            <div className="me-4 d-flex flex-wrap price-container">
              <label htmlFor="Price" className="label special-label fw-bolder">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={input.price}
                onChange={handleChange}
                onInput={toggleErr3}
                id="Price"
              />
              <small ref={warningMsg3} className="warning hidden">
                This field is required
              </small>
            </div>

            <div className="mt-lg-0 mt-sm-2 price-container">
              <label htmlFor="Total-price" className="label fw-bolder">
                Total Price
              </label>
              <input
                type="text"
                name=""
                className="form-control"
                id="Total-price"
                onChange={handleChange}
                value={input.totalPrice}
                disabled
              />
            </div>
          </div>
          <p
            ref={total}
            className={`fs-6 hidden text-wrap ${
              vatRegex.test(input.vat) ? "text-success" : "text-danger"
            }`}
          >
            {vatRegex.test(input.vat) && input.vat !== ""
              ? `Total price will be shown on invoice and it's inclusive of ${
                  input.vat != "0" ? input.vat : "0"
                }% VAT charges`
              : `vat field ${input.vat}% is invalid (use a positive value)`}
            {}
          </p>
        </div>
        <div className="container form-group mt-2">
          <label htmlFor="Description" className="label fw-bolder">
            Description
          </label>
          <textarea
            className="f-con"
            name="description"
            id="Description"
            cols="10"
            rows="10"
            value={input.description}
            onChange={handleChange}
            onInput={toggleErr4}
          ></textarea>
          <small ref={warningMsg4} className="warning hidden">
            This field is required
          </small>
        </div>
        <div className="container form-group mt-2">
          <label htmlFor="Customer-id" className="label fw-bolder">
            Customer's Email
          </label>
          <input
            type="email"
            className="form-control"
            name="customerEmail"
            value={input.customerEmail}
            onChange={handleChange}
            onInput={toggleErr5}
            id="Customer-id"
          />
          <small ref={warningMsg5} className="warning hidden">
            This field is required
          </small>
        </div>
        <div className="container mt-4 d-flex justify-content-between">
          <div className="btn-send">
            <Button
              style={{
                backgroundColor: "#0051FF",
                width: "50%",
                color: "#fff",
                Padding: "2%",
              }}
              click={handleSubmit}
              animate={animate}
            >
              Send
            </Button>
          </div>

          <div className="btn-cancel">
            <Button
              style={{
                backgroundColor: "#FF0505",
                width: "80%",
                color: "#fff",
                Padding: "2%",
              }}
              click={cancelInvoice}
            >
              <MdClose size="20px" color="#fff" />
              Cancel
            </Button>
          </div>
        </div>
        {/* {confirm && (
          <Confirm
            handleSubmit={handleSubmit}
            token={token}
            setToken={setToken}
            setConfirm={setConfirm}
          />
        )} */}
        {success && (
          <Success
            setCancel={setCancel}
            setSuccess={setSuccess}
            setConfirm={setConfirm}
          />
        )}
        {/* {cancel && (
          <Cancel
            inputVal={inputVal}
            setInputVal={setInputVal}
            cancelInvoice={cancelInvoice}
            setCancel={setCancel}
            hideForm={hideForm}
          />
        )} */}
      </form>
    </section>
  );
}

{
  /* <div className="container form-group mt-2">
<label htmlFor="Quantity" className="label fw-bolder">
  Quantity
</label>
<input
  type="number"
  className="f-con"
  name="qty"
  value={input.qty}
  onChange={handleChange}
  onInput={toggleErr2}
  id="Qunatity"
/>
<small ref={warningMsg2} className="warning hidden">
  This field is required
</small>
</div> */
}

{
  /* <div className="container form-group mt-2">
<label htmlFor="Discount" className="label fw-bolder">
  Discount in %
</label>
<input
  type="number"
  placeholder="This field is optional"
  className="f-con"
  name="discount"
  value={input.discount}
  onChange={handleChange}
  id="Discount"
  // onInput={toggleErr3}
/>
</div> */
}
