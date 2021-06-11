import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ShopNavbar from "./ShopNavbar";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./shopconsignment.css";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    width: 200,
    display: "flex",
    alignItems: "center",
  },
});

function ShopCurrentConsignments() {
  const history = useHistory();

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = useState("");
  const [btnShow, setBtnShow] = useState([]);
  const [isempty, setIsempty] = useState(false);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [infls, setInfls] = useState([
    {
      name: "",
      email: "",
      phone: "",
      photo: "",
      _id: "",
      valid: "",
      age: "",
      city: "",
      state: "",
    },
  ]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  useEffect((req, res) => {
    fetch("/api/shopCurrentConsignments", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signinshop");
        }
      })
      .then((foundcons) => {
        if (foundcons[0].length == 0) {
          setIsempty(true);
        }
        setInfls(foundcons[0]);
        setBtnShow(foundcons[1]);
        setStartDate(foundcons[2]);
        setEndDate(foundcons[3]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ShopNavbar />
      {isempty ? (
        <>
          <center>
            <div className="fatext justify-content-center col-lg-7 text-center  md-3 mt-3">
              No Current Deals right now, Here you will see your Ongoing Deals.
            </div>
          </center>
        </>
      ) : (
        <>
          <div>
            <div className="container my-3">
              <div className="row">
                {infls.map((Influencer, index) => (
                  <div className="col-10 mt-3" key={index}>
                    <div className="card">
                      <div
                        className="card-horizontal"
                        style={{
                          display: "flex",
                          flex: "1 1 auto",
                          justifyContent: "space-around",
                          margin: "18px 18px",
                        }}
                      >
                        <div className="img-square-wrapper">
                          <img
                            style={{
                              width: "200px",
                              height: "200px",
                              borderRadius: "100px",
                              position: "relative",
                            }}
                            src={Influencer.photo}
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ marginLeft: "10px" }}
                        >
                          <h4 className="card-title">{Influencer.name}</h4>
                          <h5>{Influencer.email}</h5>
                          <h5>{Influencer.phone}</h5>
                          <h5>Amount:{Influencer.valid}</h5>
                          <h5>Start Date:{startDate[index]}</h5>
                          <h5>End Date:{endDate[index]}</h5>

                          <div id={index}>
                            {btnShow[index] === "false" ? (
                              <React.Fragment>
                                <Button
                                  variant="outlined"
                                  onClick={handleClickOpen}
                                  className=" btn btn-success"
                                >
                                  Give Feedback
                                </Button>
                                <Dialog
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="form-dialog-title"
                                >
                                  <DialogTitle id="form-dialog-title">
                                    Feedback
                                  </DialogTitle>

                                  <DialogContent style={{ width: "25rem" }}>
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      label="Your Review"
                                      type="text"
                                      fullWidth
                                      value={review}
                                      onChange={(e) =>
                                        setReview(e.target.value)
                                      }
                                    />

                                    <div className={classes.root}>
                                      <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                          setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                          setHover(newHover);
                                        }}
                                      />
                                    </div>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      onClick={handleClose}
                                      color="primary"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOpen(false);

                                        var consid = Influencer._id;

                                        fetch("/api/shopFeedback", {
                                          method: "put",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            consid,
                                            review,
                                            value,
                                          }),
                                        })
                                          .then((res) => res.json())
                                          .then((data) => {
                                            if (data.error) {
                                              console.log(data.error);
                                            } else {
                                              window.location.reload(false);
                                              history.push(
                                                "/shopCurrentConsignments"
                                              );
                                            }
                                          })
                                          .catch((err) => {
                                            console.log(err);
                                          });
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <h5>Rating:{Influencer.city}</h5>
                                <h5>Review:{Influencer.age}</h5>
                              </React.Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ShopCurrentConsignments;
