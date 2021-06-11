import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ShopNavbar from "./ShopNavbar";
import "./shopconsignment.css";

function ConsignmentHistory() {
  const history = useHistory();

  const [isempty, setIsempty] = useState(false);

  const [infls, setInfls] = useState([
    {
      name: "",
      email: "",
      phone: "",
      photo: "",
      _id: "",
      valid: "",
      age: "",
      city: "",
      state: "",
    },
  ]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect((req, res) => {
    fetch("/api/shopConsignmentHistory", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signinshop");
        }
      })
      .then((foundcons) => {
        if (foundcons[0].length == 0) {
          setIsempty(true);
        }
        setInfls(foundcons[0]);
        setStartDate(foundcons[1]);
        setEndDate(foundcons[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ShopNavbar />
      {isempty ? (
        <>
          <center>
            <div className="fatext justify-content-center col-lg-7 text-center  md-3 mt-3">
              After Your consignment is completed, your consignment history is
              shown here.
            </div>
          </center>
        </>
      ) : (
        <>
          <div>
            <div className="container my-3">
              <div className="row">
                {infls.map((Influencer, index) => (
                  <div className="col-10 mt-3" key={index}>
                    <div className="card">
                      <div
                        className="card-horizontal"
                        style={{
                          display: "flex",
                          flex: "1 1 auto",
                          justifyContent: "space-around",
                          margin: "18px 18px",
                        }}
                      >
                        <div className="img-square-wrapper">
                          <img
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "100px",
                              position: "relative",
                            }}
                            src={Influencer.photo}
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ marginLeft: "10px" }}
                        >
                          <h4 className="card-title">{Influencer.name}</h4>
                          <h5>{Influencer.email}</h5>
                          <h5>{Influencer.phone}</h5>
                          <h5>Amount:{Influencer.valid}</h5>
                          <h5>Start Date:{startDate[index]}</h5>
                          <h5>End Date:{endDate[index]}</h5>
                          <h5>Rating:{Influencer.city}</h5>
                          <h5>Review:{Influencer.age}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ConsignmentHistory;
