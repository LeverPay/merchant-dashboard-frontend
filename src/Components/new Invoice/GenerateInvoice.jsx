import React from "react";
import "./style.css";
import Button from "../General/Button component/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useRef } from "react";

export default function GenerateInvoice({
  setGenerateInvoice,
  notification,
  setNotification,
}) {
  const [input, setInput] = useState({
    productName: "",
    qty: "",
    discount: "",
    price: "",
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

  const hideForm = (e) => {
    e.preventDefault();
    setGenerateInvoice(false);
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

  const addVatToPrice = (e) => {
    const vat = 0.075;
    let discount = input.discount === "" ? 0 : parseFloat(input.discount / 100);
    let final;
    if (input.price !== "") {
      if (total.current.classList.contains("hidden")) {
        total.current?.classList.remove("hidden");
      }
      const currentPrice = parseFloat(input.price);
      const vatPrice = currentPrice * vat;
      let finalVatPrice = currentPrice + vatPrice;
      const discountPrice = parseFloat(finalVatPrice * discount);
      final = finalVatPrice - discountPrice;
      return final;
    } else {
      total.current?.classList.add("hidden");
    }
  };

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
      input.productName !== "" &&
      input.qty !== "" &&
      input.price !== "" &&
      input.description !== "" &&
      input.customerId !== ""
    ) {
      const newPrice = price.current.textContent;
      input.price = newPrice;
      console.log(input);
      setGenerateInvoice(false);
      newNotification();
    }
  };

  return (
    <section className="invoice p-2 px-4">
      <div className="mt-2">
        <AiFillPlusCircle size="25px" className="text-primary" />{" "}
        <span className="mx-2 fw-light">Generate Invoice</span>
      </div>
      <form className="form container mx-4" action="" onSubmit={handleSubmit}>
        <div className="container mt-5">
          <input
            type="text"
            placeholder="Product Name"
            className="f-con"
            name="productName"
            value={input.productName}
            onChange={handleChange}
            onInput={toggleErr1}
          />
          <small ref={warningMsg1} className="warning hidden">
            This field is required
          </small>
        </div>

        <div className="container mt-2">
          <input
            type="number"
            placeholder="Quantity"
            className="f-con"
            name="qty"
            value={input.qty}
            onChange={handleChange}
            onInput={toggleErr2}
          />
          <small ref={warningMsg2} className="warning hidden">
            This field is required
          </small>
        </div>

        <div className="container mt-2">
          <select
            name="discount"
            id=""
            className="f-con"
            onChange={handleChange}
          >
            <option value="">Discount</option>
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
          </select>
        </div>

        <div className="container mt-2">
          <input
            type="number"
            placeholder="Price + (VAT 7.5%)"
            className="f-con"
            name="price"
            value={input.price}
            onChange={handleChange}
            onInput={toggleErr3}
          />
          <small ref={warningMsg3} className="warning hidden">
            This field is required
          </small>
          <p ref={total} className="text-success fs-6 hidden">
            Total price is: <span ref={price}>{addVatToPrice()}</span> (This
            price is will be shown on invoice)
          </p>
        </div>

        <div className="container mt-2">
          <textarea
            className="f-con"
            name="description"
            id=""
            cols="30"
            rows="10"
            placeholder="Product(s) Description"
            value={input.description}
            onChange={handleChange}
            onInput={toggleErr4}
          ></textarea>
          <small ref={warningMsg4} className="warning hidden">
            This field is required
          </small>
        </div>

        <div className="container mt-2">
          <input
            type="text"
            placeholder="customer's LeverPay userID"
            className="f-con"
            name="customerId"
            value={input.customerId}
            onChange={handleChange}
            onInput={toggleErr5}
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
                width: "100%",
                color: "#fff",
                Padding: "2%",
              }}
            >
              Send
            </Button>
          </div>

          <div className="btn-cancel">
            <Button
              style={{
                backgroundColor: "#FF0505",
                width: "100%",
                color: "#fff",
                Padding: "2%",
              }}
              click={hideForm}
            >
              <MdClose size="20px" color="#fff" />
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
