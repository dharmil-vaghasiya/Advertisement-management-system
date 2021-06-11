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
const LoginFormPage = () => {
  const history = useHistory();

  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const postdata = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    fetch("/api/signinshop", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("type", JSON.stringify(data.type));

          history.push("/Shophome");
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
                <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
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
                <MDBInput
                  label="Your password"
                  group
                  type="password"
                  validate
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <p className="font-small grey-text d-flex justify-content-end">
                  <a
                    href="/resetShop"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Forgot Password?
                  </a>
                </p>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="danger"
                    type="submit"
                    className="btn-block z-depth-2"
                  >
                    Log in
                  </MDBBtn>
                </div>
                <p className="font-small grey-text d-flex justify-content-center">
                  Don't have an account?
                  <a
                    href="/signupShop"
                    className="dark-grey-text font-weight-bold ml-1"
                  >
                    Sign up
                  </a>
                </p>
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

export default LoginFormPage;
