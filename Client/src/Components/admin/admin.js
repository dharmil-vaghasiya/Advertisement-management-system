import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function Admin() {
  const history = useHistory();

  const [countInf, setCountInf] = useState("");
  const [countShop, setCountShop] = useState("");
  useEffect(() => {
    fetch("/api/countInf", {
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
      .then((count) => {
        setCountInf(count);
      });
  }, []);

  useEffect(() => {
    fetch("/api/countShop", {
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
      .then((count) => {
        setCountShop(count);
      });
  }, []);

  return (
    <>
      <AdminNavbar />

      <center>
        <div
          className="row pl-2 mx-0 mt-5"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <div className="col-3"></div>
          <div>
            <div className="card" style={{ width: "300px",height:"300px", margin: "10px" }}>
              <img
                className="card-img-top"
                src="https://res.cloudinary.com/dt0e6pziw/image/upload/v1618064129/photo-1510557880182-3d4d3cba35a5_e61kcm.jpg"
                alt="Card cap"
                height="200px"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Influencers</b>
                </h5>
                <h3>{countInf}</h3>
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ width: "300px",height:"300px", margin: "10px" }}>
              <img
                className="card-img-top"
                src="https://res.cloudinary.com/dt0e6pziw/image/upload/ar_1:1,c_fill,g_auto,h_1300,q_100,w_1950/v1618064302/photo-1570857502809-08184874388e_qe7xli.jpg"
                alt="Card cap"
                height="100px"
              />
              <div className="card-body">
                <h5 className="card-title">
                  <b>Brands</b>
                </h5>
                <h3>{countShop}</h3>
                
              </div>
            </div>
          </div>
        </div>
      </center>
    </>
  );
}

export default Admin;
