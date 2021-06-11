import React, { useState, useEffect } from "react";
import InfluencerNavbar from "./InfluencerNavbar";
import { useHistory } from "react-router-dom";

function Consignments() {
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
  useEffect((req, res) => {
    fetch("/api/infconsignment", {
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
              There is no ongoing deals currently.
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
                    <h6>Email: {shop.email}</h6>
                    <h6>Contact No.: {shop.phone}</h6>
                    <h6>Amount : {amount[index]}</h6>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        fetch("/api/infRemoveRequest", {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization:
                              "Bearer " + localStorage.getItem("jwt"),
                          },
                          body: JSON.stringify({
                            consignmentid: shop._id,
                          }),
                        })
                          .then((doc) => {
                            if (doc.error) {
                              alert(doc.error);
                            } else {
                              alert("Successfully Removed");
                              history.push("/infHome");
                            }
                          })
                          .catch((err) => {
                            console.log(`inf consignment: ${err}`);
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
      </>
      )}
    </>
  );
}

export default Consignments;
