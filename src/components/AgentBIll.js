import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useSelector } from "react-redux";
import Container from "reactstrap/lib/Container";
import Table from "reactstrap/lib/Table";
import Navbar from "./Appbar";
import { firestore } from "../index";
import { CSVLink } from "react-csv";
import Input from "reactstrap/lib/Input";
import {
  Label,
  Row,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
} from "reactstrap";

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
  var [modal, setModal, dataRefModal] = useState(false);
  const toggle = () => setModal(!modal);

  const csvReport = {
    data: dataRef.current,
    headers: headers,
    filename: "PSU-eDorm-Report.csv",
  };

  const [Filterby, setFilterby] = useState("-");

  useEffect(() => {
    (async function () {
      try {
        let me = new Date();
        let mmyy = `${
          me.getMonth() + 1 < 10 ? `0${me.getMonth() + 1}` : me.getMonth() + 1
        }-${me.getFullYear()}`;
        console.log(mmyy);
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
        <Row
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <CSVLink {...csvReport}>Export to CSV</CSVLink>
          <Row>
            <Dropdown direction="end" toggle={toggle} isOpen={modal}>
              <DropdownToggle caret>Filter by : {Filterby}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  onClick={async () => {
                    setFilterby("-");
                    console.log(`${Filterby} Fillter`);
                    let temp_data = [];
                    const db = await firestore.collection(`BillList`).get();
                    db.forEach((doc) => {
                      temp_data.push(doc.data());
                    });
                    setData(temp_data);
                  }}
                >
                  -
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterby("Payment");
                    console.log(`${Filterby} Fillter`);
                    setData(
                      Data.sort((a, b) =>
                        a.payment > b.payment
                          ? 1
                          : b.payment > a.payment
                          ? -1
                          : 0
                      )
                    );
                  }}
                >
                  Date
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setFilterby("Room");
                    console.log(`${Filterby} Fillter`);
                    setData(
                      Data.sort((a, b) =>
                        a.room > b.room ? 1 : b.room > a.room ? -1 : 0
                      )
                    );
                  }}
                >
                  Room
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {Filterby == "Room" ? (
              <Input
                type="text"
                style={{
                  width: "150px",
                }}
                onKeyPress={async (event) => {
                  let word_key = event.target.value.toUpperCase();
                  if (event.charCode === 13) {
                    let temp_data = [];
                    let result;
                    const db = await firestore.collection(`BillList`).get();
                    db.forEach((doc) => {
                      temp_data.push(doc.data());
                    });
                    console.log(temp_data);
                    if (temp_data != []) {
                      result = temp_data.filter(
                        (item) => item.room == word_key
                      );
                    }
                    if (temp_data != [] && result.length > 0) {
                      setData(result);
                    } else {
                      if (word_key == "") {
                        setData(
                          temp_data.sort((a, b) =>
                            a.room > b.room ? 1 : b.room > a.room ? -1 : 0
                          )
                        );
                      }
                      console.log("filter flase");
                    }
                  }
                }}
              ></Input>
            ) : Filterby == "Payment" ? (
              <Input
                type="date"
                style={{
                  width: "150px",
                }}
                onChange={async (event) => {
                  let date = event.target.value;
                  const sDate = date.split("-");
                  const yy = sDate[0];
                  const mm = sDate[1];
                  const dd = sDate[2];
                  date = `${mm}-${yy}`;
                  console.log(date);
                  let temp_data = [];
                  let result;
                  const db = await firestore.collection(`BillList`).get();
                  db.forEach((doc) => {
                    temp_data.push(doc.data());
                  });
                  if (temp_data != []) {
                    result = temp_data.filter((item) => item.payment == date);
                    console.log(result);
                  }
                  if (temp_data != [] && result.length > 0) {
                    setData(result);
                  }
                }}
                onKeyPress={async (event) => {
                  let word_key = event.target.value.toUpperCase();
                  console.log(word_key);
                  // if (event.charCode === 13) {
                  //   let temp_data = [];
                  //   let result;
                  //   const db = await firestore.collection(`BillList`).get();
                  //   db.forEach((doc) => {
                  //     temp_data.push(doc.data());
                  //   });
                  //   console.log(temp_data);
                  //   if (temp_data != []) {
                  //     result = temp_data.filter(
                  //       (item) => item.room == word_key
                  //     );
                  //   }
                  //   if (temp_data != [] && result.length > 0) {
                  //     setData(result);
                  //   } else {
                  //     if (word_key == "") {
                  //       setData(
                  //         temp_data.sort((a, b) =>
                  //           a.room > b.room ? 1 : b.room > a.room ? -1 : 0
                  //         )
                  //       );
                  //     }
                  //     console.log("filter flase");
                  //   }
                  // }
                }}
              ></Input>
            ) : (
              <div></div>
            )}
          </Row>
        </Row>

        <Container
          style={{
            width: "30vh",
          }}
        ></Container>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            height: "79.5vh",
          }}
        >
          <Table striped>
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
