import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Twitter } from "@material-ui/icons";
import SiteManagerNavbar from "./SiteManagerNavbar";
import { useHistory } from "react-router-dom";

const SiteManager = () => {
  const history = useHistory();
  const [influencers, setInfluencers] = useState([
    {
      name: "",
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
    fetch("/api/influencers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signinmanager");
        }
      })
      .then((jsonRes) => setInfluencers(jsonRes));
  }, []);

  return (
    <>
      <SiteManagerNavbar />
      <div className="container-fluid mt-5">
        <table className="table">
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td className="text-center">
                <b>Email</b>
              </td>
              <td>
                <b>Phone</b>
              </td>
              <td>
                <b>Age</b>
              </td>
              <td>
                <b>City</b>
              </td>
              <td>
                <b>State</b>
              </td>
              <td>
                <b>Country</b>
              </td>

              <td>
                <b>Insta</b>
              </td>
              <td>
                <b>Insta Followers</b>
              </td>
              <td>
                <b>Insta Engagement Rate</b>
              </td>

              <td>
                <b>Facebook</b>
              </td>
              <td>
                <b>Facebook Followers</b>
              </td>
              <td>
                <b>Facebook Engagement Rate</b>
              </td>

              <td>
                <b>Twitter</b>
              </td>
              <td>
                <b>Twitter Followers</b>
              </td>
              <td>
                <b>Twitter Engagement Rate</b>
              </td>
              <td
                style={{
                  backgroundColor: "#57D973",
                  fontSize: "20px",
                }}
                className="text-center"
              >
                <b>ADD</b>
              </td>
              <td
                style={{
                  backgroundColor: "#FC8781",
                  fontSize: "20px",
                }}
                className="text-center"
              >
                <b>REMOVE</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {influencers.map((influencer, index) => (
              <tr key={index}>
                <td>{influencer.name}</td>
                <td>{influencer.email}</td>
                <td>{influencer.phone}</td>
                <td>{influencer.age}</td>
                <td>{influencer.city}</td>
                <td>{influencer.state}</td>
                <td>{influencer.country}</td>

                <td>
                  <a
                    href={influencer.instagramURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Instagram />
                  </a>
                </td>
                <td>{influencer.instagramFollowers}</td>
                <td>{influencer.instagramEngagementRate}</td>

                <td>
                  <a
                    href={influencer.facebookURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Facebook />
                  </a>
                </td>
                <td>{influencer.facebookFollowers}</td>
                <td>{influencer.facebookEngagementRate}</td>

                <td>
                  <a
                    href={influencer.twitterURL}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Twitter />
                  </a>
                </td>
                <td>{influencer.twitterFollowers}</td>
                <td>{influencer.twitterEngagementRate}</td>
                <td width="20%">
                  <button
                    className="btn-block btn bg-success text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      var ans = window.confirm("Want to add Influencer?");
                      if (ans) {
                        fetch("/api/updateInf", {
                          method: "PUT",
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
                              alert("Successfully Added");

                              window.location.reload();

                              //email sender
                              fetch("/email/add", {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  email: influencer.email,
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
                    Add
                  </button>
                </td>
                <td width="20%">
                  <button
                    className="btn-block btn bg-danger text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      var ans = window.confirm("Want to remove Influencer?");
                      if (ans) {
                        fetch("/api/deleteInf", {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ email: influencer.email }),
                        })
                          .then((data) => {
                            if (data.error) {
                              alert(data.error);
                            } else {
                              alert("Successfully Removed");

                              window.location.reload();

                              //email sender
                              fetch("/email/remove", {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  email: influencer.email,
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
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SiteManager;
