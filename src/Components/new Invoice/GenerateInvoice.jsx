import React from "react";
import "./style.css";
import Button from "../General/Button component/Button";

export default function GenerateInvoice() {
  return (
    <section className="div">
      <form action="">
        <div>
          <input type="text" placeholder="Product Name" />
        </div>

        <div>
          <input type="number" placeholder="Quantity" />
        </div>

        <div>
          <select name="" id="">
            <option value="">Discount</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>

        <div>
          <input type="number" placeholder="Price + (VAT 7.5%)" />
        </div>

        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Product(s) Description"
          ></textarea>
        </div>

        <div>
          <input type="text" placeholder="customer's LeverPay userID" />
        </div>

        <div>
          <div>
            <Button>Send</Button>
          </div>

          <div>
            <Button>Cancel</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
