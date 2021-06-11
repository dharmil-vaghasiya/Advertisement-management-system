import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import ShopNavbar from "./ShopNavbar";
import { useHistory } from "react-router-dom";
function InfDetail() {
  const location = useLocation();
  const history = useHistory();
  const [data, setdata] = useState([
    {
      name: "",
      instagramURL: "",
      facebookURL: "",
      twitterURL: "",
      email: "",
      _id: "",
      rating: "",
      count: "",
    },
  ]);

  const [reviews, setReviews] = useState([
    {
      review: "",
      rating: "",
    },
  ]);

  const [shopName, setShopName] = useState([]);

  useEffect(() => {
    setdata(location.state.data[0]);

    fetch("/api/influencerReview", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ infid: location.state.data[0]._id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setShopName(jsonRes[0]);
        setReviews(jsonRes[1]);
      });
  }, [location]);

  return (
    <>
      <ShopNavbar />
      <div className="container mt-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={data.photo}
                      alt="Admin"
                      className="rounded-circle"
                      width="200rem"
                      height="200vh"
                    />
                    <div className="mt-3">
                      <h4>{data.name}</h4>
                      <p className="text-secondary mb-1">Influencer</p>

                      <div>
                        <Rating
                          name="read-only"
                          value={data.rating / data.count}
                          precision={0.01}
                          readOnly
                        />
                      </div>
                      <p className="text-muted font-size-sm">
                        {data.city}, {data.state}, {data.country}
                      </p>
                      <button
                        className="btn btn-primary btn-block"
                        onClick={(e) => {
                          e.preventDefault();
                          fetch("/api/sendrequest", {
                            method: "post",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization:
                                "Bearer " + localStorage.getItem("jwt"),
                            },
                            body: JSON.stringify({ influencerid: data._id }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.error) {
                                alert(data.error);
                              } else {
                                alert("Request has been sended");
                                // console.log(data);
                                history.push("/Shophome");
                              }
                            });
                        }}
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter mr-2 icon-inline text-info"
                        href={data.instagramURL}
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                      <a
                        href={data.twitterURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Twitter
                      </a>
                    </h6>
                    <span className="text-secondary">{data.twitter}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram mr-2 icon-inline text-danger"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <a
                        href={data.instagramURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Instagram
                      </a>
                    </h6>
                    <span className="text-secondary">{data.instagram}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-facebook mr-2 icon-inline text-primary"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                      <a
                        href={data.facebookURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Facebook
                      </a>
                    </h6>
                    <span className="text-secondary">{data.facebook}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  {reviews.map((review, index) => (
                    <div className="row" key={index}>
                      <div className="col-sm-5">
                        <h6 className="mb-0">{shopName[index]}</h6>
                        <Rating
                          name="read-only"
                          value={review.rating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div className="col-sm-7 text-secondary">
                        {review.review}
                      </div>

                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfDetail;
