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

export default function GenerateInvoice() {
  const { notification, setNotification } = useContext(NotificationContext);
  const { success: alert, notify } = useContext(TokenContext);
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [token, setToken] = useState("");
  const [backBtnClicked, setBackbtnClicked] = useState(false);
  const [cancelBtnClicked, setCancelBtnClicked] = useState(false);
  const [confirmBtnClicked, setConfirmBtnClicked] = useState(false);
  const [inputVal, setInputVal] = useState({
    reason: "",
    transactionID: "",
  });

  const [input, setInput] = useState({
    productName: "",
    qty: "",
    discount: "",
    price: "",
    totalPrice: "",
    description: "",
    customerId: "",
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
      if (!warningMsg1.current.classList.contains("hidden")) {
        warningMsg1.current.classList.add("hidden");
      }
    } else {
      warningMsg1.current.classList.remove("hidden");
    }
  };

  const toggleErr2 = () => {
    if (input.qty !== "") {
      if (!warningMsg2.current.classList.contains("hidden")) {
        warningMsg2.current.classList.add("hidden");
      }
    } else {
      warningMsg2.current.classList.remove("hidden");
    }
  };

  const toggleErr3 = () => {
    if (input.price !== "") {
      if (!warningMsg3.current.classList.contains("hidden")) {
        warningMsg3.current.classList.add("hidden");
      }
    } else {
      warningMsg3.current.classList.remove("hidden");
    }
  };

  const toggleErr4 = () => {
    if (input.description !== "") {
      if (!warningMsg4.current.classList.contains("hidden")) {
        warningMsg4.current.classList.add("hidden");
      }
    } else {
      warningMsg4.current.classList.remove("hidden");
    }
  };

  const toggleErr5 = () => {
    if (input.customerId !== "") {
      if (!warningMsg5.current.classList.contains("hidden")) {
        warningMsg5.current.classList.add("hidden");
      }
    } else {
      warningMsg5.current.classList.remove("hidden");
    }
  };

  useEffect(() => {
    const vat = 0.075;
    let discount = input.discount === "" ? 0 : parseFloat(input.discount) / 100;
    let final;

    if (input.price !== "") {
      const currentPrice = parseFloat(input.price);
      const vatPrice = currentPrice * vat;
      let finalVatPrice = currentPrice + vatPrice;
      const discountPrice = parseFloat(finalVatPrice * discount);
      final = finalVatPrice - discountPrice;

      setInput((prev) => ({
        ...prev,
        totalPrice: final.toFixed(2),
      }));

      if (total.current?.classList.contains("hidden")) {
        total.current?.classList.remove("hidden");
      }
    } else {
      if (!total.current?.classList.contains("hidden")) {
        total.current?.classList.add("hidden");
      }
    }
  }, [input.price, input.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let numericValue = value;
    if (name === "qty" || name == "price") {
      numericValue = value.replace(/[^0-9]/g, "");
    }
    setInput((prev) => ({ ...prev, [name]: numericValue }));
  };

  const validate = () => {
    if (input.productName !== "") {
      if (!warningMsg1.current.classList.contains("hidden")) {
        warningMsg1.current.classList.add("hidden");
      }
    } else {
      warningMsg1.current.classList.remove("hidden");
    }

    if (input.qty !== "") {
      if (!warningMsg2.current.classList.contains("hidden")) {
        warningMsg2.current.classList.add("hidden");
      }
    } else {
      warningMsg2.current.classList.remove("hidden");
    }

    if (input.price !== "") {
      if (!warningMsg3.current.classList.contains("hidden")) {
        warningMsg3.current.classList.add("hidden");
      }
    } else {
      warningMsg3.current.classList.remove("hidden");
    }

    if (input.description !== "") {
      if (!warningMsg4.current.classList.contains("hidden")) {
        warningMsg4.current.classList.add("hidden");
      }
    } else {
      warningMsg4.current.classList.remove("hidden");
    }

    if (input.customerId !== "") {
      if (!warningMsg5.current.classList.contains("hidden")) {
        warningMsg5.current.classList.add("hidden");
      }
    } else {
      warningMsg5.current.classList.remove("hidden");
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
    if (
      input.description !== "" &&
      input.customerId !== "" &&
      input.price !== "" &&
      input.productName !== "" &&
      input.qty !== "" &&
      input.totalPrice !== ""
    ) {
      setTimeout(() => {
        alert(
          "Your Invoice has been generated and successfully sent to leverpay user account for approval"
        );
      }, 3000);

      setSuccess(true);
      console.log(input, token);
      clearInput();
      newNotification();
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
    }));
  };

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
        <div className="container form-container mt-5">
          <label htmlFor="Product-name" className="label fw-bolder">
            Product Name
          </label>
          <input
            type="text"
            className="f-con"
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

        <div className="container form-container mt-2">
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
        </div>

        <div className="container form-container mt-2">
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
        </div>

        <div className="mt-2 px-3">
          <div className="d-lg-flex align-items-center price-container">
            <div className="me-4 d-flex flex-wrap price-container">
              <label htmlFor="Price" className="label special-label fw-bolder">
                Price
              </label>
              <input
                type="number"
                className="f-con-1"
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
                className="f-con-1"
                id="Total-price"
                onChange={handleChange}
                value={input.totalPrice}
                readOnly={true}
              />
            </div>
          </div>
          <p ref={total} className="text-success fs-6 hidden text-wrap">
            Total price will be shown on invoice and it's inclusive of 7.5% VAT
            charges
          </p>
        </div>

        <div className="container form-container mt-2">
          <label htmlFor="Description" className="label fw-bolder">
            Description
          </label>
          <textarea
            className="f-con"
            name="description"
            id="Description"
            cols="30"
            rows="10"
            value={input.description}
            onChange={handleChange}
            onInput={toggleErr4}
          ></textarea>
          <small ref={warningMsg4} className="warning hidden">
            This field is required
          </small>
        </div>

        <div className="container form-container mt-2">
          <label htmlFor="Customer-id" className="label fw-bolder">
            Customer's ID
          </label>
          <input
            type="text"
            className="f-con"
            name="customerId"
            value={input.customerId}
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
