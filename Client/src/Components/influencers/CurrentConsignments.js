import React, { useState, useEffect } from "react";
import InfluencerNavbar from "./InfluencerNavbar";
import { useHistory } from "react-router-dom";

function CurrentConsignments() {
  const history = useHistory();
  const [isempty, setIsempty] = useState(false);
  const [shops, setShops] = useState([
    {
      name: "",
      email: "",
      phone: "",
      shopName: "",
      address: "",
      photo1: "",
      photo2: "",
    },
  ]);
  const [amount, setAmount] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  useEffect((req, res) => {
    fetch("/api/infCurrentconsignment", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signininf");
        }
      })
      .then((foundcons) => {
        if (foundcons[0].length == 0) {
          setIsempty(true);
        }
        setShops(foundcons[0]);
        setAmount(foundcons[1]);
        setStartDate(foundcons[2]);
        setEndDate(foundcons[3]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <InfluencerNavbar />

      {isempty ? (
        <>
          <center>
            <div className="fatext justify-content-center col-lg-7 text-center  md-3 mt-3">
              No deals are currently ongoing with any brand.
            </div>
          </center>
        </>
      ) : (
        <>

      <div className="container my-5">
        <div className="row">
          {shops.map((shop, index) => (
            <div className="col-12 mt-3" key={index}>
              <div className="card col-sm-12">
                <div
                  className="card-horizontal col-sm-12"
                  style={{ display: "flex", flex: "1 1 auto" }}
                >
                  <div className="img-square-wrapper">
                    <img
                      className="img"
                      src={shop.photo1}
                      style={{ height: "35vh", width: "20rem" }}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body col-sm-12">
                    <h4 className="card-title">{shop.shopName}</h4>
                    <h6>Owner Name: {shop.name}</h6>
                    <h6>Address: {shop.address}</h6>
                    <h6>Contact No.: {shop.phone}</h6>
                    <h6>Amount : {amount[index]}</h6>
                    <h6>StartDate : {startDate[index]}</h6>
                    <h6>EndDate : {endDate[index]}</h6>
                    <h6>
                      Payment Status: <b>Done</b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}
    </>

  );
}

export default CurrentConsignments;
