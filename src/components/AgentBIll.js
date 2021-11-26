import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useSelector } from "react-redux";
import Container from "reactstrap/lib/Container";
import Table from "reactstrap/lib/Table";
import Navbar from "./Appbar";
import { firestore } from "../index";
import firebase from "firebase";
import { CSVLink } from "react-csv";

const AgentBill = () => {
  const login = useSelector((state) => state.login);
  var [Data, setData, dataRef] = useState([]);
  let temp = [];
  const headers = [
    { label: "Payment", key: "payment" },
    { label: "Room", key: "room" },
    { label: "Date", key: "date" },
    { label: "Unit", key: "unit" },
    { label: "Fee", key: "cash" },
  ];

  const test_getdata = async () => {
    let me = new Date();
    let mmyy = `${me.getMonth() + 1}-${me.getFullYear()}`;
    const db = await firestore.collection(`BillList`).get();

    db.forEach((doc) => {
      temp.push(doc.data());
      // setloaded_data(temp);
      console.log(temp);
    });

    // console.log(loaded_data);
  };

  const csvReport = {
    data: dataRef.current,
    headers: headers,
    filename: "PSU-eDorm-Report.csv",
  };

  // useEffect(() => {
  //   test_getdata();
  // }, []);
  useEffect(() => {
    (async function () {
      try {
        let me = new Date();
        let mmyy = `${me.getMonth() + 1}-${me.getFullYear()}`;
        const db = await firestore.collection(`BillList`).get();
        db.forEach((doc) => {
          temp.push(doc.data());
        });
        console.log("result =", temp);
        setData(temp);
        console.log("counter =", dataRef.current); // will give you the latest results
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar name="Electricity Bill Management" />
      <div className="App">
        <h1>AgentBill</h1>
        <CSVLink {...csvReport}>Export to CSV</CSVLink>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            height: "79.5vh",
          }}
        >
          <Table>
            <thead>
              <tr>
                <th>Payment</th>
                <th>Room</th>
                <th>Date</th>
                <th>Unit</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {dataRef.current.map((item) => {
                return (
                  <tr>
                    <td>{item["payment"]}</td>
                    <td>{item["room"]}</td>
                    <td>{item["date"]}</td>
                    <td>{item["unit"]}</td>
                    <td>{item["cash"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};
export default AgentBill;
