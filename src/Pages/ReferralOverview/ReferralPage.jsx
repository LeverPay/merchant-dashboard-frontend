import React, { useContext, useState } from "react";
import './ReferralPage.css'
import Card from "../../Components/cards/affiliate-cards/Card";
 import CardIcon from "../../Assets/cardIcon3.svg"
 import CopyIcon from "../../Assets/copyIcon.svg"
import { useEffect } from "react";
import axios from "axios";
import { baseUrl, fetchInfo, get_all_referral_code, get_all_referrals } from "../../Components/Endpoints";
import { TokenContext } from "../../Components/User-Token/TokenContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lock from "../../Assets/sec-padlock.png"
import { data } from "../../Components/Payment-method/TestData";

export default function ReferralPageOverview() {

    const [listOfReferrals, setListOfReferrals]  = useState([]);
    const [referralCode, setReferralCode]  = useState({
        code:'',
        points:0
    });
    const toastId = React.useRef(null);
  
    const notify = (message) => {
      if(! toast.isActive(toastId.current)) {
        toastId.current = toast(message);
      }
  
    }
  
    const [copySuccess, setCopySuccess] = useState('');
    const dismiss = () =>  toast.dismiss(toastId.current);
    const getReferralList = async () =>{
    notify("Loading, Please wait")
    try {
        const response = await axios.get(baseUrl +   get_all_referrals , {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
              },}); // Replace with your API endpoint

          let data = response.data?.data;
          console.log(response);
          if (response.status === 200) {
            dismiss()
            setListOfReferrals(data);
          }   
          
      } catch (error) {
        toast.error( error.response.data.message)
        console.error(error);
      }
    }

    const getReferralCode = async () =>{
        try {
            const response = await axios.get(baseUrl +   get_all_referral_code , {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("Name")}`,
                  },}); // Replace with your API endpoint
    
              let data = response?.data;
              console.log(data,'........code');
              if (response.status === 200) {
               
                setReferralCode({
                    ...referralCode,
                    code:data.referral_code,
                    points:data.total_point
                });
                console.log(referralCode,'...herr');
              }   
              
          } catch (error) {
            toast.error( error.response.data.message)
            console.error(error);
          }
        }


        const copyToClipBoard = async (dataToCopy) => {
            try {
              await navigator.clipboard.writeText(dataToCopy);
              notify("Copied to clipboard")
              setCopySuccess('Copied!');
              setTimeout(() => {
                dismiss()
              }, 1000);
              
            } catch (err) {
              setCopySuccess('Failed to copy!');
            }
          }

    useEffect(()=>{
            getReferralList();
            getReferralCode();
    },[])
    return  (
        <div className="page-container">
        <div className="revenue-revenue-container">
            <section className="revenue-cards-container">

        <Card
          icon={CardIcon}
          status="Coin Earned"
          count={referralCode?.points}
          color="#657064"
        />
       


            </section>

            <section  className="revenue-link-div">
                <div className="revenue-link">
                    <span className="revenue-text">Referral Code:</span>
                    <div className="revenue-right-side" onClick={()=>copyToClipBoard(referralCode?.code)}>
                    <span className="revenue-text">{referralCode?.code}</span>
                    <span ><img src={CopyIcon} alt="" /></span>
                    </div>
                </div>


                <div className="revenue-link">
                    <span className="revenue-text">Referral Link:</span>
                    <div className="revenue-right-side"  onClick={()=>copyToClipBoard("merchant.leverpay.io/referral_link")}>
                    <span className="revenue-text">merchant.leverpay.io/referral_link</span>
                    <span><img src={CopyIcon} alt="" /></span>
                    </div>
                </div>
            </section>


            <section className="table-section">
           { listOfReferrals.length>0?<div className="table-body">
            <table id="revenue-revenue-table">
                <thead>
                    <tr>
                        <th className="table-text color-zero">Date </th>
                        <th className="table-text table-color-one">Name</th>
                        <th className="table-text table-color-two">Email</th>
                    </tr>
                    </thead>
                    <tbody className="table-body">
                        {
                            listOfReferrals.map((data)=>{
                                <tr >
                                <td className="table-text color-zeroB">{data?.created_at.split('T'[0])}</td>
                                <td className="table-text table-color-four">{`${data?.first_name} ${data?.last_name}`}</td>
                                <td className="table-text table-color-five">{data?.email}</td>
                             
                            </tr>
                            })
                        }
  
                  
                    </tbody>
                    
        </table>
        </div> : <div className="NoReferralMessage">
            Opps! <br />
            No referral Yet
            </div>}


            </section>
        </div>
            <div className="previous-page">

                <div className="button-div">
                    <span className="singleButton">Previous</span>

                    <span className="singleButton">Next</span>


                </div>

            </div>

            <div className="affiliate-reg-footer">
          <img src={lock} alt="secured" className="mx-2" />
          <p className="m-0">
            Secured by{" "}
            <span className="fw-bolder" style={{ color: "#2962f2" }}>
              Leverpay
            </span>
          </p>
        </div>

        </div>
    )
}

