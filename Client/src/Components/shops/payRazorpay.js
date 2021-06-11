import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import ShopNavbar from "./ShopNavbar";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const PayRazorpay = () => {
  const history = useHistory();
  const location = useLocation();

  const [nconsid, setNconsid] = useState("");
  const [nAmount, setNAmount] = useState("");
  const [npaymentid, setNpaymentid] = useState("");
  const [isdateset, setIsdateset] = useState(false);
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  useEffect(() => {
    var d2 = { consid: nconsid, Amount: nAmount, paymentid: npaymentid };
    if (isdateset) {
      fetch("/api/consignmentdate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consid: d2.consid,
          sdate,
          edate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.log(err));
    }
  }, [isdateset]);

  useEffect(() => {
    setNAmount(location.state.data.Amount);
    setNconsid(location.state.data.consid);
    setNpaymentid(location.state.data.paymentid);
  }, [location]);

  async function razorPayPaymentHandler() {
    var d1 = { consid: nconsid, Amount: nAmount, paymentid: npaymentid };
    const API_URL = `http://localhost:9000/razorpay/`;
    const orderUrl = `${API_URL}order`;
    const response = await Axios.post(orderUrl, d1);
    const { data } = response;

    const options = {
      key: "",
      name: "Advera",
      description: d1.consid,
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(url, d1);
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;
          if (captured) {
            toast.success("Payment Successfull");
            toast.success("Goto Current consignment page for more detail")
           // history.push("/shopCurrentConsignments");
          } else {
            toast.error("Payment Failed");
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', function (response){
      toast.error("Payment Failed",{autoClose:7000});
        });
  }

  return (
    <>
      <ShopNavbar />
      <center>
        <div
          className="card m-5 p-4"
          style={{ width: "20rem", height: "50vh", position: "relative" }}
        >
          <span>
            <label>Enter Amount:</label>
            <input
              type="number"
              min="0"
              value={nAmount}
              onChange={(e) => {
                setNAmount(e.target.value);
              }}
            ></input>
          </span>
          <br />
          <div>
            <label>Start Date:</label>
            <br />
            <input
              type="date"
              id="startDate"
              value={sdate}
              onChange={(e) => setSdate(e.target.value)}
            ></input>
          </div>
          <br />
          <div>
            <label>End Date:</label>
            <br />
            <input
              type="date"
              id="endDate"
              value={edate}
              onChange={(e) => setEdate(e.target.value)}
            ></input>
          </div>
          <br />

          <button
            type="button"
            className="btn btn-success"
            onClick={(e) => {
              e.preventDefault();
              if(nAmount<=0){
                toast.error("Amount must be positive number.",{autoClose:5000});
                return;
              }
              if(edate>sdate){
                setIsdateset(true);
                razorPayPaymentHandler();
              }
              else{
                toast.error("Input dates properly.",{autoClose:5000});
              }
              
              
            }}
          >
            Make Payment
          </button>
        </div>
        <div id="msg1"></div>
      </center>
    </>
  );
};

export default PayRazorpay;
