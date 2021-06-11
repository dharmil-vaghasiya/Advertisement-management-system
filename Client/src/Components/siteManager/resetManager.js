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
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ResetInf = () => {
  const history = useHistory();

  const [email, setemail] = useState("");

  const postdata = (e) => {
    console.log("postdata called ");
    e.preventDefault();
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid email");
      return;
    }
    fetch("/email/reset-password-manager", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          alert("Check Your Mail");
          history.push("/managersignin");
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
                  Reset Password
                </h3>
              </MDBRow>
            </div>
            <MDBCardBody className="mx-4 mt-4">
              <form onSubmit={postdata}>
                <MDBInput
                  label="Your email"
                  group
                  type="text"
                  name="email"
                  validate
                  required
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
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

export default ResetInf;
