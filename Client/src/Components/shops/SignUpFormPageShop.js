import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SignUpFormPageShop = () => {
  const history = useHistory();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [shopName, setshopName] = useState("");
  const [address, setaddress] = useState("");
  const [image1, setImage1] = useState("");
  const [url1, setUrl1] = useState("");
  const [image2, setImage2] = useState("");
  const [url2, setUrl2] = useState("");
  const [location, setlocation] = useState("");

  useEffect(
    (req, res) => {
      if (url1 != "" && url2 != "") {
        submitdata();
      }
    },
    [url1, url2]
  );

  const postdata = (e) => {
    e.preventDefault();
    toast.warning("Wait, Images Uploading");
    uploaddata1();
    uploaddata2();
  };

  function uploaddata1() {
    const data = new FormData();
    data.append("file", image1);
    data.append("upload_preset", "advera_img88");
    data.append("cloud_name", "dt0e6pziw");
    fetch("https://api.cloudinary.com/v1_1/dt0e6pziw/image/upload", {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
      .then((data) => { 
        setUrl1(data.url)
      })
      .catch((err) => console.log(err));
  }
  function uploaddata2() {
    const data1 = new FormData();
    data1.append("file", image2);
    data1.append("upload_preset", "advera_img88");
    data1.append("cloud_name", "dt0e6pziw");
    fetch("https://api.cloudinary.com/v1_1/dt0e6pziw/image/upload", {
      method: "post",
      body: data1,
    })
    .then((res) => res.json())
      .then((data) => {
        setUrl2(data.url)
      })
      .catch((err) => console.log(err));
  }

  function submitdata() {
    
    fetch("/api/sigupshop", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        shopName,
        address,
        photo1: url1,
        photo2: url2,
        location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("done")
          history.push("/signinShop");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol />
        <MDBCol md="8">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={postdata}>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        required
                        autocomplete="off"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </MDBCol>
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
                        autocomplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        required
                        name="password"
                        autocomplete="off"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
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
                        autocomplete="off"
                        name="phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Brand/Shop Name"
                        icon="shopping-cart"
                        group
                        type="text"
                        validate
                        required
                        autocomplete="off"
                        name="shopName"
                        value={shopName}
                        onChange={(e) => setshopName(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Brand/Shop Address"
                        icon="map-marker-alt"
                        group
                        type="text"
                        validate
                        required
                        name="address"
                        autocomplete="off"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <label>Brand Image1</label>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          setImage1(e.target.files[0]);
                        }}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <label>Brand Image2</label>
                      <input
                        type="file"
                        required
                        onChange={(e) => {
                          setImage2(e.target.files[0]);
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Location link"
                        icon="map-marker-alt"
                        group
                        type="url"
                        validate
                        required
                        name="Location link"
                        value={location}
                        onChange={(e) => setlocation(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
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
  );
};

export default SignUpFormPageShop;
