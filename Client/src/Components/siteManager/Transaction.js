import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Badge from "react-bootstrap/Badge";
import SiteManagerNavbar from "./SiteManagerNavbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Transaction() {
  const classes = useStyles();
  const history = useHistory();

  const [shopemail, setShopemail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [infemail, setInfemail] = useState("");
  const [total, setTotal] = useState(0);

  const [counter, setCounter] = useState(1);

  const [showPerPage, setShowPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };

  const [data, setData] = useState([
    {
      Amount: "",
      paymentid: "",
      paymentstatus: "",
      date: "",
      senderemail: "",
      receiveremail: "",
    },
  ]);
  const [pageNumber, setPageNumber] = useState(0);
  const fetchdata = (e) => {
    if (shopemail.trim() === "" && infemail.trim() === "") {
      toast.error("Please Fill the fields.");
      return;
    }

    fetch("/api/transactionHistory", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        shopemail,
        infemail,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          history.push("/signinmanager");
        }
      })
      .then((jsonRes) => {
        setTotal(jsonRes.length);
        
        var erw = total / showPerPage;
        if (erw > parseInt(erw)) {
          setNumberOfButoons(parseInt(erw) + 1);
        } else {
          setNumberOfButoons(parseInt(erw));
        }

        setLoaded(true);
        setData(jsonRes);

        document.getElementById("msg").innerHTML = "";
      })
      .catch((err) => console.log(err));
  };
  const [numberOfButtons, setNumberOfButoons] = useState(0);

  return (
    <>
      <SiteManagerNavbar />
      <br />

      <center>
        <TextField
          id="outlined-basic"
          label="Brand email"
          variant="outlined"
          className="mt-3 ml-5"
          style={{ width: "30rem" }}
          value={shopemail}
          onChange={(e) => setShopemail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Influencer email"
          variant="outlined"
          className="mt-3 ml-5"
          style={{ width: "30rem" }}
          value={infemail}
          onChange={(e) => setInfemail(e.target.value)}
        />
        <span>
          &nbsp;&nbsp;
          <button className="btn btn-info mt-3" onClick={(e) => fetchdata(e)}>
            Search
          </button>
        </span>
      </center>
      <TableContainer component={Paper} className="mt-5">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Payment ID</StyledTableCell>
              <StyledTableCell align="right">Brand</StyledTableCell>
              <StyledTableCell align="right">Influencer</StyledTableCell>
              <StyledTableCell align="right">Amount&nbsp;(Rs.)</StyledTableCell>
              <StyledTableCell align="right">Date-Time</StyledTableCell>
              <StyledTableCell align="right">Payment Status</StyledTableCell>
            </TableRow>
          </TableHead>
          {loaded ? (
            <>
              <TableBody>
                {data.slice(pagination.start, pagination.end).map((row) => (
                  <StyledTableRow key={row.paymentid}>
                    <StyledTableCell component="th" scope="row">
                      {row.paymentid}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.senderemail}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.receiveremail}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.Amount}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.paymentstatus ? (
                        <h5>
                          <Badge variant="success">Success</Badge>{" "}
                        </h5>
                      ) : (
                        <h5>
                          <Badge variant="danger">Failed</Badge>{" "}
                        </h5>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <></>
          )}
        </Table>
      </TableContainer>

      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="!#"
                onClick={(e) => {
                  e.preventDefault();
                  onButtonClick("prev");
                }}
              >
                Previous
              </a>
            </li>
            {/* {`page-item ${index + 1 === counter ? "active" : null}`} */}
            {new Array(numberOfButtons).fill("").map((el, index) => (
              <li
                className={`page-item ${
                  index + 1 === counter ? "active" : null
                }`}
              >
                <a
                  className="page-link"
                  href="javascript:void(0)"
                  onClick={(e) => {
                    e.preventDefault();
                    setCounter(index + 1);
                  }}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a
                className="page-link"
                href="javascript:void(0)"
                onClick={(e) => {
                  e.preventDefault();
                  onButtonClick("next");
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <center>
        <div className="msg" id="msg"></div>
      </center>
    </>
  );
}
