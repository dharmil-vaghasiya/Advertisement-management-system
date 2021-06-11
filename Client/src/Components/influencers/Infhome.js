import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import InfluencerNavbar from "./InfluencerNavbar";

const Infhome = () => {
  const history = useHistory();
  const [isempty, setIsempty] = useState(false);
  const [shops, setShops] = useState([
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      shopName: "",
      address: "",
    },
  ]);
  useEffect(() => {
    fetch("/api/allrequest", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
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
      .then((jsonRes) => {
        if (jsonRes.length == 0) {
          setIsempty(true);
        }
        setShops(jsonRes);
      });
  }, []);

  return (
    <>
      <InfluencerNavbar />

      {isempty ? (
        <>
          <center>
            <div className="fatext justify-content-center col-lg-7 text-center  md-3 mt-3">
              No pending requests from any Brand.
            </div>
          </center>
        </>
      ) : (
        <>

      <div className="row mt-4">
        {shops.map((shop, index) => (
          <div className="col-sm-6" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Shop Owner Name : {shop.name}</h5>
                <h5 className="card-title">Shop Name : {shop.shopName}</h5>
                <h5 className="card-title">Shop Address : {shop.address}</h5>
                <MDBBtn
                  color="unique"
                  onClick={(e) => {
                    e.preventDefault();
                    fetch("/api/shop", {
                      method: "post",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ email: shop.email }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.error) {
                          alert(data.error);
                        } else {
                          history.push({
                            pathname: "/shopDetail",
                            state: { data },
                          });
                        }
                      });
                  }}
                >
                  View More
                </MDBBtn>
              </div>
            </div>
          </div>
          // </div>
        ))}
      </div>
      </>
      )}

    </>
  );
};

export default Infhome;
