import React, { useState, useEffect } from "react";
import InfluencerNavbar from "./InfluencerNavbar";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function InfProfilelook() {
  const history = useHistory();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/api/infphoto", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
           toast.success("Photo uploaded successfully.");
           window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  useEffect(() => {
    fetch("/api/getinfphoto", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((datadetail) => {
        if (datadetail.error) {
          console.log(datadetail.error);
        } else {
          setdata(datadetail[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postDetails = () => {
    console.log("Method called");
    document.getElementById("buttn").innerHTML = "Uploading...";
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "advera_img88");
    data.append("cloud_name", "dt0e6pziw");
    fetch("https://api.cloudinary.com/v1_1/dt0e6pziw/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [data, setdata] = useState([
    {
      name: "",
      instagramURL: "",
      facebookURL: "",
      twitterURL: "",
      email: "",
      photo: "",
    },
  ]);

  return (
    <>
      <InfluencerNavbar />
      <div className="container my-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3"></div>
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={data.photo}
                      alt="Upload profile pic"
                      className="rounded-circle"
                      width="200"
                      height="200"
                    />
                    <div className="mt-3">
                      <h4>{data.name}</h4>

                      <p className="text-secondary mb-1">Influencer</p>
                      <p className="text-muted font-size-sm">
                        {data.city}, {data.state}, {data.country}
                      </p>
                      <button className="btn btn-primary btn-block" disabled>
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="form-group">
                  <center>
                    <label htmlFor="exampleFormControlFile1">
                      <b>Upload image</b>
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="exampleFormControlFile1"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                    <button
                      className="btn btn-primary mt-3"
                      id="buttn"
                      onClick={() => postDetails()}
                    >
                      Upload
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfProfilelook;
