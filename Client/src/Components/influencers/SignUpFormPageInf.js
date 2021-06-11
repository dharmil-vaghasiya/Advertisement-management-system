import React, { useState } from "react";
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

const SignUpFormPageInf = () => {
  const history = useHistory();
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [age, setage] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [instagram, setinstagram] = useState("");
  const [instagramURL, setinstagramURL] = useState("");
  const [instagramFollowers, setinstagramFollowers] = useState("");
  const [instagramEngagementRate, setinstagramEngagementRate] = useState("");
  const [facebook, setfacebook] = useState("");
  const [facebookURL, setfacebookURL] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [facebookEngagementRate, setfacebookEngagementRate] = useState("");
  const [twitter, settwitter] = useState("");
  const [twitterURL, settwitterURL] = useState("");
  const [twitterFollowers, settwitterFollowers] = useState("");
  const [twitterEngagementRate, settwitterEngagementRate] = useState("");

  const postdata = (e) => {
    e.preventDefault();
    fetch("/api/sigupinf", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        age,
        city,
        state,
        country,
        instagram,
        instagramURL,
        instagramFollowers,
        instagramEngagementRate,
        facebook,
        facebookURL,
        facebookFollowers,
        facebookEngagementRate,
        twitter,
        twitterURL,
        twitterFollowers,
        twitterEngagementRate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          alert(
            "your account is under verification, We will inform you via mail."
          );
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                        name="phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
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
                        value={age}
                        onChange={(e) => setage(e.target.value)}
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
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
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
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your country"
                        icon="flag"
                        group
                        type="text"
                        validate
                        required
                        name="country"
                        value={country}
                        onChange={(e) => setcountry(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
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
                        value={instagram}
                        onChange={(e) => setinstagram(e.target.value)}
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
                        value={instagramURL}
                        onChange={(e) => setinstagramURL(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Instagram Followers"
                        icon="users"
                        group
                        type="text"
                        validate
                        required
                        name="instagramFollowers"
                        value={instagramFollowers}
                        onChange={(e) => setinstagramFollowers(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Instagram Engagement Rate"
                        icon="star"
                        group
                        type="number"
                        validate
                        required
                        name="instagramEngagementRate"
                        value={instagramEngagementRate}
                        onChange={(e) =>
                          setinstagramEngagementRate(e.target.value)
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
                        value={facebook}
                        onChange={(e) => setfacebook(e.target.value)}
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
                        value={facebookURL}
                        onChange={(e) => setfacebookURL(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your FaceBook Followers"
                        icon="users"
                        group
                        type="text"
                        validate
                        required
                        name="facebookFollowers"
                        value={facebookFollowers}
                        onChange={(e) => setfacebookFollowers(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Facebook Engagement Rate"
                        icon="star"
                        group
                        type="number"
                        validate
                        required
                        name="facebookEngagementRate"
                        value={facebookEngagementRate}
                        onChange={(e) =>
                          setfacebookEngagementRate(e.target.value)
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
                        value={twitter}
                        onChange={(e) => settwitter(e.target.value)}
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
                        value={twitterURL}
                        onChange={(e) => settwitterURL(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Twitter Followers"
                        icon="users"
                        group
                        type="text"
                        validate
                        name="twitterFollowers"
                        value={twitterFollowers}
                        onChange={(e) => settwitterFollowers(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md="6" className="md-3">
                      <MDBInput
                        label="Your Twitter Engagement Rate"
                        icon="star"
                        group
                        type="number"
                        validate
                        name="twitterEngagementRate"
                        value={twitterEngagementRate}
                        onChange={(e) =>
                          settwitterEngagementRate(e.target.value)
                        }
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

export default SignUpFormPageInf;
