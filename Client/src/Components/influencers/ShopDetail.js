import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import InfluencerNavbar from "./InfluencerNavbar";
import {
  MDBCarousel,
  MDBRow,
  MDBCol,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} from "mdbreact";
function ShopDetail() {
  const location = useLocation();
  const history = useHistory();
  const [data, setdata] = useState([
    {
      name: "",
      email: "",
      shopName: "",
      address: "",
      location: "",
      photo1: "",
      photo2: "",
      _id: "",
    },
  ]);

  useEffect(() => {
    setdata(location.state.data[0]);
    console.log(data);
  }, [location]);

  return (
    <>
      <InfluencerNavbar />
      <div
        style={{
          backgroundColor: "#ccf2ff",
          fontFamily: "'Source Code Pro', 'monospace'",
        }}
      >
        <div
          className="shop-name text-center bold"
          style={{
            backgroundColor: "#80dfff",
            height: "70px",
            fontSize: "2.5rem",
            padding: "10px",
          }}
        >
          <h1>{data.shopName}</h1>
        </div>

        <MDBRow>
          <MDBCol size="6" className="px-5">
            <h3>Owner Name: </h3>
            <h4>{data.name}</h4>
            <br />
            <br />
            <h3>Address:</h3>
            <h4>{data.address}</h4>

            <br />
            <br />
            <h3>
              Location:
              <a href={data.location} rel="noreferrer" target="_blank">
                <i className="fas fa-map-marker-alt"></i>
              </a>
            </h3>
            <br />
            <button
              className=" btn bg-success text-white"
              onClick={(e) => {
                e.preventDefault();

                var ans = window.confirm("Want to Accept Request?");
                if (ans) {
                  fetch("/api/updateConsignment", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                    body: JSON.stringify({ sid: data._id }),
                  })
                    .then((res) => res.json())
                    .then((doc) => {
                      if (doc.error) {
                        alert(doc.error);
                      } else {
                        alert("Successfully Added");
                        history.push("/infHome");

                        //email sender
                        fetch("/email/acceptReq", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization:
                              "Bearer " + localStorage.getItem("jwt"),
                          },
                          body: JSON.stringify({
                            email: data.email,
                          }),
                        })
                          .then((res) => res.json())
                          .then((res) => {
                            console.log("here is the response: ", res);
                          })
                          .catch((err) => {
                            console.error("here is the error: ", err);
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(`hello: ${err}`);
                    });
                }
              }}
            >
              Accept
            </button>
            <button
              className=" btn bg-danger text-white"
              onClick={(e) => {
                e.preventDefault();

                var ans = window.confirm("Want to Reject Request?");
                if (ans) {
                  fetch("/api/deleteConsignment", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                    body: JSON.stringify({ sid: data._id }),
                  })
                    .then((doc) => {
                      if (doc.error) {
                        alert(doc.error);
                      } else {
                        alert("Successfully Removed");
                        history.push("/infHome");

                        //email sender
                        fetch("/email/rejectReq", {
                          method: "POST",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization:
                              "Bearer " + localStorage.getItem("jwt"),
                          },
                          body: JSON.stringify({
                            email: data.email,
                          }),
                        })
                          .then((res) => res.json())
                          .then((res) => {
                            console.log("here is the response: ", res);
                          })
                          .catch((err) => {
                            console.error("here is the error: ", err);
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(`hello: ${err}`);
                    });
                }
              }}
            >
              Reject
            </button>
          </MDBCol>
          <MDBCol size="6" className="px-5">
            <MDBContainer className="mt-2">
              <MDBCarousel
                activeItem={1}
                length={2}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
              >
                <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                    <MDBView>
                      <img
                        className="d-block w-100 "
                        src={data.photo1}
                        alt="First slide"
                        style={{ height: "50vh" }}
                      />
                      <MDBMask overlay="black-light" />
                    </MDBView>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
                    <MDBView>
                      <img
                        className="d-block w-100 "
                        src={data.photo2}
                        alt="Second slide"
                        style={{ height: "50vh" }}
                      />
                    </MDBView>
                  </MDBCarouselItem>
                </MDBCarouselInner>
              </MDBCarousel>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    </>
  );
}

export default ShopDetail;
