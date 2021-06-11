import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
  MDBCardText,
} from "mdbreact";
import Rating from "@material-ui/lab/Rating";
import $ from "jquery";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export default function NSearch() {
  const history = useHistory();
  const [influencers, setInfluencers] = useState([
    {
      name: "",
      email: "",
      photo: "",
      instagramURL: "",
      facebookURL: "",
      twitterURL: "",
      instagramFollowers: "",
      rating: "",
      count: "",
    },
  ]);

  const [userDetails, setUserDetails] = useState([]);
  const [cityy, setCityy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchused, setSearchused] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          let pno = pageNumber + 1;

          setPageNumber(pno);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const SearchAll = () => {
    setLoading(true);
    setError(false);

    fetch("/api/allInfluencersdynamic", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pageNumber }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setInfluencers([...influencers, ...res]);
        setHasMore(res.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  };

  useEffect(() => {
    fetch("/api/search-all-city", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((results) => {
        var i,
          len,
          arr = [];
        for (i = 0, len = results.length; i < len; i++) {
          arr.push(results[i].city);
        }
        function removeDup(data) {
          return data.filter((value, index) => data.indexOf(value) == index);
        }
        var dup = removeDup(arr);
        setUserDetails(dup);
      });
  }, []);

  const fetchUsers = (query) => {
    setsearchvalue(query.toLowerCase());
    if (query != "") {
      var arr1 = [];
      Array.from(userDetails).forEach(function (userDetail) {
        if (userDetail.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
          arr1.push(userDetail);
        }
      });
      setCityy(arr1);
    }
  };

  const searchByCity = () => {
    var val = document.getElementById("search-city").value;
    if(val===""){
      window.location.reload(false);
    }
    if (cityy.indexOf(searchvalue) === -1 && cityy.indexOf(val) === -1) {
      toast.error("Please provide valid city name.");
      return;
    } else if (val !== "") {
      setHasMore(false);
      fetch("/api/influencer-search-by-city", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: val }),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setInfluencers(jsonRes);
          val = -1;
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (searchvalue !== "") {
      setHasMore(false);
      fetch("/api/influencer-search-by-city", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: searchvalue }),
      })
        .then((res) => res.json())
        .then((jsonRes) => {
          setInfluencers(jsonRes);
          document.getElementById("search-city").value = searchvalue;
          //setsearchvalue(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // else {
    //   window.location.reload();
    //   setInfluencers([]);
    //   setPageNumber(0);
    // }
  };

  useEffect(() => {
    if (!searchused) {
      SearchAll();
    }
  }, [pageNumber]);

  

  return (
    <>
      <div className="row">
        <div className="col-3"></div>

        <Autocomplete
          id="search-city"
          options={cityy}
          getOptionLabel={(option) => option}
          style={{ width: "50%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="search-by-city"
              variant="outlined"
              onChange={(e) => fetchUsers(e.target.value)}
            />
          )}
        />
        <span>
          <button className="btn btn-info ml-3" onClick={searchByCity}>
            Search
          </button>
        </span>
      </div>

      <MDBRow className="px-0" style={{ backgroundColor: "#f2f2f2" }}>
        {influencers.map((influencer, index) => {
          if (influencers.length === index + 1) {
            return (
              <>
                <MDBCol md="3" key={index} className="my-5">
                  <MDBCard wide cascade>
                    <MDBView cascade>
                      <MDBCardImage
                        hover
                        overlay="white-slight"
                        className="card-img-top"
                        height="300px"
                        width="250px"
                        src={influencer.photo}
                        alt="Card cap"
                      />
                    </MDBView>
                    <div ref={lastBookElementRef} />
                    <MDBCardBody cascade className="text-center">
                      <MDBCardTitle className="card-title">
                        <strong>{influencer.name}</strong>
                      </MDBCardTitle>

                      <MDBCol md="12" className="d-flex justify-content-center">
                        <a
                          href={influencer.instagramURL}
                          className="px-2 fa-lg ig-ic"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MDBIcon fab icon="instagram" />
                        </a>

                        <a
                          href={influencer.facebookURL}
                          className="px-2 fa-lg fb-ic"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MDBIcon fab icon="facebook-f" />
                        </a>

                        <a
                          href={influencer.twitterURL}
                          className="px-2 fa-lg tw-ic"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MDBIcon fab icon="twitter" />
                        </a>
                      </MDBCol>
                      <MDBCardText className="my-2">
                        <div>
                          <Rating
                            name="read-only"
                            value={influencer.rating / influencer.count}
                            precision={0.01}
                            readOnly
                          />
                        </div>
                        Instagram Followers : {influencer.instagramFollowers}
                      </MDBCardText>
                      <MDBBtn
                        color="unique"
                        onClick={(e) => {
                          e.preventDefault();
                          fetch("/api/influencer", {
                            method: "post",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: influencer.email }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              if (data.error) {
                                alert(data.error);
                              } else {
                                history.push({
                                  pathname: "/infDetail",
                                  state: { data },
                                });
                              }
                            });
                        }}
                      >
                        View More
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </>
            );
          } else {
            if (index == 0) {
            } else {
              return (
                <>
                  <MDBCol md="3" key={index} className="my-5">
                    <MDBCard wide cascade>
                      <MDBView cascade>
                        <MDBCardImage
                          hover
                          overlay="white-slight"
                          className="card-img-top"
                          height="300px"
                        width="250px"
                          src={influencer.photo}
                          alt="Card cap"
                        />
                      </MDBView>

                      <MDBCardBody cascade className="text-center">
                        <MDBCardTitle className="card-title">
                          <strong>{influencer.name}</strong>
                        </MDBCardTitle>

                        <MDBCol
                          md="12"
                          className="d-flex justify-content-center"
                        >
                          <a
                            href={influencer.instagramURL}
                            className="px-2 fa-lg ig-ic"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon fab icon="instagram" />
                          </a>

                          <a
                            href={influencer.facebookURL}
                            className="px-2 fa-lg fb-ic"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon fab icon="facebook-f" />
                          </a>

                          <a
                            href={influencer.twitterURL}
                            className="px-2 fa-lg tw-ic"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <MDBIcon fab icon="twitter" />
                          </a>
                        </MDBCol>
                        <MDBCardText className="my-2">
                          <div>
                            <Rating
                              name="read-only"
                              value={influencer.rating / influencer.count}
                              precision={0.01}
                              readOnly
                            />
                          </div>
                          Instagram Followers : {influencer.instagramFollowers}
                        </MDBCardText>
                        <MDBBtn
                          color="unique"
                          onClick={(e) => {
                            e.preventDefault();
                            fetch("/api/influencer", {
                              method: "post",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ email: influencer.email }),
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                if (data.error) {
                                  alert(data.error);
                                } else {
                                  history.push({
                                    pathname: "/infDetail",
                                    state: { data },
                                  });
                                }
                              });
                          }}
                        >
                          View More
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </>
              );
            }
          }
        })}
      </MDBRow>
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </>
  );
}
