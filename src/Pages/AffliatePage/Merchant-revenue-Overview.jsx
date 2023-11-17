import React from "react";
import './merchant-revenue-Overview.css'
import Card from "../../Components/cards/affiliate-cards/Card";
import totalEarned from "../../Assets/totalearnedbadge.svg";
import receivedBadge from "../../Assets/receivedbadge.svg";
import unremittedBadge from "../../Assets/failedbadge.svg";

export default function MerchantRevenueOverview() {

    return  (
        <div className="page-container">
        <div className="merchant-revenue-container">
            <section className="search-box-container">
                <span className="input-container">
                <input
                    type="search"
                    name=""
                    placeholder="Search"
                    className="input px-5 py-2 rounded-4"
                />
                <img
                    src={require("../../Assets/search-icon.png")}
                    alt=""
                    className="input-icon"
                />
                </span>
            </section>


            <section className="merchant-cards-container">

        <Card
          icon={totalEarned}
          status="Total Earned"
          count={2000}
          color="#0B0230"
        />
        <Card
          icon={receivedBadge}
          status="Received"
          count={302}
          color="#0C6904"
        />
        <Card
          icon={unremittedBadge}
          status="Unremitted"
          count={20}
          color="#FF0505"
        />


            </section>


            <section className="table-section">
            <div className="table-body">
            <table id="merchant-revenue-table">
                <thead>
                    <tr>
                        <th className="table-text color-zero">Date | Time</th>
                        <th className="table-text table-color-one">Revenue</th>
                        <th className="table-text table-color-two">Remitted</th>
                        <th className="table-text table-color-three">Unremitted</th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                    <tr>
                        <td className="table-text color-zeroB">23/10/23 10:12</td>
                        <td className="table-text table-color-four">$10,000</td>
                        <td className="table-text table-color-five">$320</td>
                        <td className="table-text table-color-six">$1,200</td>
                    </tr>
                    <tr>
                        <td className="table-text color-zeroB">23/10/23 10:12</td>
                        <td className="table-text table-color-four">$5,000</td>
                        <td className="table-text table-color-five">$9,300</td>
                        <td className="table-text table-color-six">$4,200</td>
                    </tr>
                    <tr>
                         <td className="table-text color-zeroB">23/10/23 10:12</td>
                         <td className="table-text table-color-four">$50,000</td>
                        <td className="table-text table-color-five">$32,220</td>
                        <td className="table-text table-color-six">$200</td>
                    </tr>
                    <tr>
                         <td className="table-text color-zeroB">23/10/23 10:12</td>
                         <td className="table-text table-color-four">$50,000</td>
                        <td className="table-text table-color-five">$32,220</td>
                        <td className="table-text table-color-six">$200</td>
                    </tr>                    <tr>
                         <td className="table-text color-zeroB">23/10/23 10:12</td>
                         <td className="table-text table-color-four">$50,000</td>
                        <td className="table-text table-color-five">$32,220</td>
                        <td className="table-text table-color-six">$200</td>
                    </tr>
                    
                    </tbody>
                    
        </table>
        </div>

            </section>
        </div>
            <div className="previous-page">

                <div className="button-div">
                    <span className="singleButton">Previous</span>

                    <span className="singleButton">Next</span>


                </div>

            </div>

        </div>
    )
}

