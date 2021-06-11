import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useHistory } from "react-router-dom";

function DeleteManager() {
  const history = useHistory();
  const [manager, setManager] = useState([
    {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  ]);

  useEffect(() => {
    fetch("/api/siteManagers", {
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
      .then((jsonRes) => setManager(jsonRes));
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <table className="table">
          <thead>
            <tr>
              {/* <th scope="col">No.</th> */}
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Mobile no.</b>
              </td>
              <td>
                <b>Email</b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {manager.map((manager, index) => (
              <tr key={index}>
                {/* <th scope="row">1</th> */}
                <td>{manager.name}</td>
                <td>{manager.phone}</td>
                <td>{manager.email}</td>
                <td width="20%">
                  <button
                    className="btn-block btn bg-danger text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      var ans = window.confirm("are u sure? u want to delete?");
                      if (ans) {
                        fetch("/api/deleteManager", {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ email: manager.email }),
                        })
                          .then((data) => {
                            if (data.error) {
                              alert(data.error);
                            } else {
                              alert("Successfully Removed");
                              history.push("/admin");
                            }
                          })
                          .catch((err) => {
                            console.log(`hello: ${err}`);
                          });
                      }
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DeleteManager;
