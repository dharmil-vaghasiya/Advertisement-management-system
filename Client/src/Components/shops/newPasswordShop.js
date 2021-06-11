import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const NewPasswordShop = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");

  const { token } = useParams();

  const postdata = (e) => {
    e.preventDefault();

    fetch("/email/new-password-shop", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          alert("Password Updated");
          history.push("/signinshop");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol></MDBCol>
        <MDBCol md="5" className="">
          <MDBCard>
            <div className="header pt-3 grey lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                  New Password
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={postdata}>
                <MDBInput
                  label="Enter Your New Password"
                  group
                  type="password"
                  name="text"
                  validate
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="primary"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Submit
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
        <MDBCol></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NewPasswordShop;
