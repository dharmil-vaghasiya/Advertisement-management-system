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
import AdminNavbar from "./AdminNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function AddManager() {
  const history = useHistory();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");

  useEffect(() => {
    fetch("/api/adminverification", {
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

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postdata = (e) => {
    e.preventDefault();
    fetch("/api/addManager", {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signinmanager");
        }
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          history.push("/deleteManager");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AdminNavbar />

      <MDBContainer className="mt-5">
        <MDBRow>
          <MDBCol md="2" />
          <MDBCol md="8">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={postdata}>
                  <p className="h4 text-center py-4">Add Manager</p>
                  <div className="grey-text px-5">
                    <MDBCol md="10" className="md-3">
                      <MDBInput
                        label="name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="10" className="md-3">
                      <MDBInput
                        label="email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </MDBCol>

                    <MDBCol md="10" className="md-3">
                      <MDBInput
                        label="password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        required
                        name="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="10" className="md-3">
                      <MDBInput
                        label="Phone Number"
                        icon="phone-alt"
                        group
                        type="tel"
                        validate
                        required
                        name="phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                      />
                    </MDBCol>
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Add
                    </MDBBtn>
                  </div>
                </form>

                <div className="msg" id="msg"></div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol />
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default AddManager;
