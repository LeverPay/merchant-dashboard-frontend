import React from "react";
import "./style.css";
import Button from "../General/Button component/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";

export default function GenerateInvoice({ setGenerateInvoice }) {
  const hideForm = (e) => {
    e.preventDefault();
    setGenerateInvoice(false);
  };

  return (
    <section className="invoice p-2 px-4">
      <div className="mt-2">
        <AiFillPlusCircle size="25px" className="text-primary" />{" "}
        <span className="mx-2 fw-light">Generate Invoice</span>
      </div>
      <form className="container mx-4" action="">
        <div className="container mt-5">
          <input type="text" placeholder="Product Name" className="f-con" />
        </div>

        <div className="container mt-2">
          <input type="number" placeholder="Quantity" className="f-con" />
        </div>

        <div className="container mt-2">
          <select name="" id="" className="f-con">
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
          />
        </div>

        <div className="container mt-2">
          <textarea
            className="f-con"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Product(s) Description"
          ></textarea>
        </div>

        <div className="container mt-2">
          <input
            type="text"
            placeholder="customer's LeverPay userID"
            className="f-con"
          />
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
