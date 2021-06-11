import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ShopNavbar from "./ShopNavbar";
import "./shopconsignment.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ShopPendingRequests() {
  const history = useHistory();
  const [isempty, setIsempty] = useState(false);
  const [infls, setInfls] = useState([
    {
      name: "",
      email: "",
      phone: "",
      photo: "",
      _id:""
    },
  ]);

  useEffect((req, res) => {
    fetch("/api/shopPendingRequests", {
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
              No pending request to influencer ,pending requests will be shown
              here.
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
                          <h4 className="card-title">
                            <b>{Influencer.name}</b>
                          </h4>
                          <p>
                            When Influencer Accept or Reject Your request, we
                            will inform you via mail!!
                          </p>

                          <p>Thank You!!</p>
                          <button type="button" 
                          class="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            fetch("/api/removeconnection", {
                              
                              method: "post",
                              headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt"),
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ infid : Influencer._id }),
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.error) {
                                  toast.error("Somethig went wrong");
                                } else {
                                  window.location.reload();
                                }
                              });
                          }}
                          >Remove</button>
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

export default ShopPendingRequests;
