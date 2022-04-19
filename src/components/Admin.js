import React, { useEffect } from "react";
import useState from "react-usestateref";
import Container from "reactstrap/lib/Container";
import Table from "reactstrap/lib/Table";
import Navbar from "./Appbar";
import { firestore } from "../index";
import Row from "reactstrap/lib/Row";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { VscEdit } from "react-icons/vsc";
import { TiDelete } from "react-icons/ti";

const Admin = () => {
  var [Data, setData, dataRef] = useState([]);
  var [modal, setModal, dataRefModal] = useState(false);
  var [delmodal, setDelModal, dataRefDelModal] = useState(false);
  var [roomdata, setRoomdata, dataRoomdata] = useState([]);
  var [unitChange, setUnitChange, dataUnitChange] = useState(0);
  var [cashChange, setCashChange, dataCashChange] = useState(0);
  var [fliterroom, setFliterroom, dataFliterroom] = useState(null);
  var [fliterdate, setFliterdate, dataFliterdate] = useState(null);
  const toggle = () => {
    setModal(!modal);
  };
  const Deltoggle = () => setDelModal(!delmodal);
  let temp = [];
  let me = new Date();
  let mmyy = `${
    me.getMonth() > 10 ? me.getMonth() : `0${me.getMonth()}`
  }-${me.getFullYear()}`;
  console.log("mmyy", mmyy);
  useEffect(() => {
    (async function () {
      try {
        const db = await firestore.collection(`BillList`).get();
        db.forEach((doc) => {
          // console.log(doc.id);
          let pp_data = doc.data();
          pp_data.id = doc.id;
          temp.push(pp_data);
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
      <Container>
        <h1>Admin Page</h1>

        <Row
          style={{
            justifyContent: "flex-end",
            margin: 6,
          }}
        >
          <Label style={{ paddingRight: 10 }}>Room :</Label>
          <Input
            style={{ width: "30%" }}
            onChange={(e) => {
              let target = e.target.value;
              setFliterroom(target.toUpperCase());
            }}
          ></Input>
        </Row>
        <Row
          style={{
            justifyContent: "flex-end",
            margin: 6,
          }}
        >
          <Label style={{ paddingRight: 10 }}>Payment Date : </Label>
          <Input
            style={{ width: "21.5%" }}
            type="date"
            onChange={(e) => {
              let target = e.target.value;
              let ddate = target.split("-");
              setFliterdate(`${ddate[1]}-${ddate[0]}`);
            }}
          ></Input>
          <Button
            color="primary"
            style={{ marginLeft: 5 }}
            onClick={async () => {
              let db_temp = [];
              let temp_db = await firestore.collection("BillList").get();
              temp_db.forEach((doc) => {
                db_temp.push(doc.data());
              });
              if (fliterroom != null && fliterroom != "") {
                console.log("fliterroom", fliterroom);
                db_temp = db_temp.filter((item) => item.room == fliterroom);
              }
              if (fliterdate != null) {
                console.log("fliterdate", fliterdate);
                db_temp = db_temp.filter((item) => item.payment == fliterdate);
              }
              if (
                (fliterroom == null || fliterroom == "") &&
                fliterdate == null
              ) {
                alert("กรุณาใส่ข้อมูลการค้นหา");
              }
              setData(db_temp);
              console.log(db_temp);
            }}
          >
            Search
          </Button>
        </Row>

        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            height: "79.5vh",
          }}
        >
          {" "}
          <Table striped>
            <thead>
              <tr>
                <th>Payment</th>
                <th>Room</th>
                <th>Date</th>
                <th>Unit</th>
                <th>Fee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                // dataRef.current
                Data.map((item) => {
                  // console.log(item);
                  return (
                    <tr
                      style={
                        item["cash"] == 0
                          ? {
                              border: "3px solid rgba(248, 159, 159, .3)",
                            }
                          : {}
                      }
                    >
                      <td>{item["payment"]}</td>
                      <td>{item["room"]}</td>
                      <td>{item["date"]}</td>
                      <td>{item["unit"]}</td>
                      <td>{item["cash"]}</td>
                      <td>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            color="success"
                            style={{
                              height: "55px",
                              width: "55px",
                            }}
                            onClick={() => {
                              // console.log(item);
                              toggle();
                              setRoomdata(item);
                            }}
                          >
                            <VscEdit />
                            <p>edit</p>
                          </Button>
                          <Button
                            color="danger"
                            style={{
                              height: "55px",
                              width: "55px",
                            }}
                            onClick={() => {
                              Deltoggle();
                              setRoomdata(item);
                            }}
                          >
                            <TiDelete />
                            <p>del</p>
                          </Button>
                        </Row>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>{" "}
          <Modal
            isOpen={modal}
            // fade={false}
            size="lg"
            centered
          >
            <ModalHeader toggle={toggle}>
              แก้ไขข้อมูลห้อง {roomdata["room"]}{" "}
            </ModalHeader>
            <ModalBody>
              <Container>
                รอบจดบันทึก : {roomdata["payment"]} <br />
                วันที่จดบันทึก : {roomdata["date"]} <br />
                <br />
                <FormGroup>
                  <Label>ปริมาณการใช้ :</Label>
                  <Input
                    name="unit"
                    placeholder={roomdata["unit"]}
                    type="number"
                    onChange={(e) => {
                      setUnitChange(e.target.value);
                      console.log(dataCashChange.current);
                    }}
                  />
                  <Label>ค่าใช้ไฟฟ้า :</Label>
                  <Input
                    name="cash"
                    placeholder={roomdata["cash"]}
                    type="number"
                    onChange={(e) => {
                      setCashChange(e.target.value);
                      console.log(dataCashChange.current);
                      console.log(dataUnitChange.current);
                    }}
                  />
                </FormGroup>
                รูปจดบันทึก : {" "}
                {roomdata.image !== "" ? (
                  <img src={roomdata.image} alt="new" />
                ) : (
                  <div style={{color:"red"}}> ไม่พบรูปในระบบ </div>
                )}
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={async () => {
                  toggle();

                  let temp = [];

                  let bf_db = await firestore.collection("BillList").get();
                  bf_db.forEach((doc) => {
                    temp.push(doc.data());
                  });
                  let payment_date = roomdata["payment"].split("-");
                  let payment_mm =
                    payment_date[0] - 1 < 10
                      ? `0${payment_date[0] - 1}`
                      : payment_date[0] - 1;
                  let result = temp.filter(
                    (doc) => doc.payment == `${payment_mm}-${payment_date[1]}`
                  );
                  let ans;

                
                  console.log("dataUnitChange.current", dataUnitChange.current);
                  console.log("dataCashChange.current", dataCashChange.current);

                  // unit change
                  if (cashChange == 0 && unitChange != 0) {
                    if (result.length > 0) {
                      console.log("have data before");
                      ans = Math.abs(result[0] != undefined ? unitChange - result[0].unit:0);
                      console.log(ans);
                      setCashChange(ans * 5);
                    }
                  } else if (
                    dataCashChange.current != 0 &&
                    dataUnitChange.current == 0
                  ) {
                    console.log(
                      dataUnitChange.current,
                      "=>>",
                      parseInt(roomdata["unit"])
                    );
                      setUnitChange( parseInt(roomdata["unit"]));
                  }
                  console.log(dataUnitChange.current);
                  await firestore
                    .collection(`BillList`)
                    .doc(`${roomdata.id}`)
                    .update({
                      unit: dataUnitChange.current,
                      cash: dataCashChange.current,
                    });

                  window.location.reload();
                }}
              >
                บันทึก
              </Button>{" "}
              <Button onClick={toggle}>ยกเลิก</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={delmodal} fade={false} size="lg" centered>
            <ModalHeader toggle={Deltoggle}>
              ลบข้อมูล ห้อง {roomdata["room"]} วันที่ {roomdata["date"]} ?{" "}
            </ModalHeader>
            <ModalFooter>
              <Button
                color="danger"
                onClick={async () => {
                  Deltoggle();
                  const db = await firestore
                    .collection(`BillList`)
                    .doc(`${roomdata.id}`)
                    .delete();
                  window.location.reload();
                }}
              >
                ลบข้อมูล
              </Button>{" "}
              <Button onClick={Deltoggle}>ยกเลิก</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </Container>
    </div>
  );
};
export default Admin;
