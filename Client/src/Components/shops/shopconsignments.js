import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ShopNavbar from "./ShopNavbar";
import "./shopconsignment.css";

function Shopconsignments() {
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
    },
  ]);

  useEffect((req, res) => {
    fetch("/api/shopconsignment", {
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
        if (foundcons.length == 0) {
          setIsempty(true);
        }
        setInfls(foundcons);
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
              No Payments are due and No Ongoing deals.
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

                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              var data = {
                                consid: "",
                                Amount: 0,
                                paymentid: "0",
                              };
                              data.consid = Influencer._id;

                              history.push({
                                pathname: "/payRazorpay",
                                state: { data },
                              });
                            }}
                          >
                            Make a Payment
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              fetch("/api/shopRemoveRequest", {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization:
                                    "Bearer " + localStorage.getItem("jwt"),
                                },
                                body: JSON.stringify({
                                  consignmentid: Influencer._id,
                                }),
                              })
                                .then((doc) => {
                                  if (doc.error) {
                                    alert(doc.error);
                                  } else {
                                    alert("Successfully Removed");
                                    history.push("/shopHome");
                                  }
                                })
                                .catch((err) => {
                                  console.log(`shop consignment: ${err}`);
                                });
                            }}
                          >
                            Remove
                          </button>
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

export default Shopconsignments;
