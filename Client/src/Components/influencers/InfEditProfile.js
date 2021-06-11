import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { useHistory } from "react-router-dom";
import InfluencerNavbar from "./InfluencerNavbar";
import "./InfEditProfile.css";
import { toast } from "react-toastify";

const InfEditProfile = () => {
  const history = useHistory();
  const [influencers, setInfluencers] = useState([
    {
      email: "",
      phone: "",
      age: "",
      city: "",
      state: "",
      country: "",
      instagram: "",
      instagramURL: "",
      instagramFollowers: "",
      instagramEngagementRate: "",
      facebook: "",
      facebookURL: "",
      facebookFollowers: "",
      facebookEngagementRate: "",
      twitter: "",
      twitterURL: "",
      twitterFollowers: "",
      twitterEngagementRate: "",
    },
  ]);

  useEffect(() => {
    fetch("/api/editinfluencer", {
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
      .then((jsonRes) => {
        setInfluencers(jsonRes[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postdata = (e) => {
    e.preventDefault();

    fetch("/api/Editchange", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(influencers),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Profile updated successfully.")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <InfluencerNavbar />
      <div id="page-content-wrapper">
        <MDBContainer className="my-5">
          <MDBRow>
            <MDBCol />
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={postdata}>
                    <p className="h4 text-center py-4">Edit Profile</p>
                    <div className="grey-text">
                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your email"
                            icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            required
                            name="email"
                            value={influencers.email}
                            onChange={(e) =>
                              setInfluencers({ email: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Phone Number"
                            icon="phone-alt"
                            group
                            type="tel"
                            validate
                            required
                            name="phone"
                            value={influencers.phone}
                            onChange={(e) =>
                              setInfluencers({ phone: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Age"
                            icon="calendar-plus"
                            group
                            type="number"
                            validate
                            required
                            name="age"
                            value={influencers.age}
                            onChange={(e) =>
                              setInfluencers({ age: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your City"
                            icon="city"
                            group
                            type="text"
                            validate
                            required
                            name="city"
                            value={influencers.city}
                            onChange={(e) =>
                              setInfluencers({ city: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your State"
                            icon="warehouse"
                            group
                            type="text"
                            validate
                            required
                            name="state"
                            value={influencers.state}
                            onChange={(e) =>
                              setInfluencers({ state: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Country"
                            icon="flag"
                            group
                            type="text"
                            validate
                            required
                            name="country"
                            value={influencers.country}
                            onChange={(e) =>
                              setInfluencers({ country: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>
                      <MDBRow></MDBRow>
                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Instagram Handle"
                            icon="user-edit"
                            group
                            type="text"
                            validate
                            required
                            name="instagram"
                            value={influencers.instagram}
                            onChange={(e) =>
                              setInfluencers({ instagram: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Instagram URL"
                            icon="link"
                            group
                            type="url"
                            validate
                            required
                            name="instagramURL"
                            value={influencers.instagramURL}
                            onChange={(e) =>
                              setInfluencers({ instagramURL: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your FaceBook Handle"
                            icon="user-edit"
                            group
                            type="text"
                            validate
                            required
                            name="facebook"
                            value={influencers.facebook}
                            onChange={(e) =>
                              setInfluencers({ facebook: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your FaceBook URL"
                            icon="link"
                            group
                            type="url"
                            validate
                            required
                            name="facebookURL"
                            value={influencers.facebookURL}
                            onChange={(e) =>
                              setInfluencers({ facebookURL: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBRow>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Twitter Handle"
                            icon="user-edit"
                            group
                            type="text"
                            validate
                            name="twitter"
                            value={influencers.twitter}
                            onChange={(e) =>
                              setInfluencers({ twitter: e.target.value })
                            }
                          />
                        </MDBCol>
                        <MDBCol md="6" className="md-3">
                          <MDBInput
                            label="Your Twitter URL"
                            icon="link"
                            group
                            type="url"
                            validate
                            name="twitterURL"
                            value={influencers.twitterURL}
                            onChange={(e) =>
                              setInfluencers({ twitterURL: e.target.value })
                            }
                          />
                        </MDBCol>
                      </MDBRow>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn color="cyan" type="submit">
                        Upadate Details
                      </MDBBtn>
                    </div>
                  </form>
                  <div
                    className="msg"
                    id="msg"
                    style={{
                      textAlign: "center",
                      flexDirection: "column",
                      flex: "auto",
                    }}
                  ></div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol />
          </MDBRow>
        </MDBContainer>
      </div>
    </>
  );
};

export default InfEditProfile;
