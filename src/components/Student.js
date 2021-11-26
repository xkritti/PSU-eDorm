import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useSelector } from "react-redux";
import Navbar from "./Appbar";
import { firestore } from "../index";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
} from "reactstrap";
import Table from "reactstrap/lib/Table";

const Student = () => {
  const login = useSelector((state) => state.login);
  const std_id = localStorage.getItem("userID");
  const std_name = localStorage.getItem("Name");
  var [Data, setData, dataRef] = useState([]);
  var temp = [];
  var [check_member, setcheck_member, check_memberRef] = useState();

  const [modal, setModal, modalRef] = useState(false);
  const [floor, setfloor, floorRef] = useState(null);
  const [room, setroom, roomRef] = useState(null);
  const [userdata, setuserdata, userdataRef] = useState([]);
  const [userroom, setuserroom, userroomRef] = useState("");

  const toggle = () => setModal(!modal);

  const [tempfloor, settempfloor] = useState([
    null,
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
  ]);
  const Add1 = tempfloor.map((Add1) => Add1);
  const handlefloorChange = (e) => setfloor(tempfloor[e.target.value]);

  const [temproom, settemproom] = useState([
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ]);
  const Add2 = temproom.map((Add2) => Add2);
  const handleroomChange = (e) => setroom(temproom[e.target.value]);

  useEffect(() => {
    console.log(login);
    (async function () {
      try {
        let me = new Date();
        let mmyy = `${me.getMonth() + 1}-${me.getFullYear()}`;
        const db = await firestore.collection(`Users`).doc(`${std_id}`).get();
        setcheck_member(db.exists);
        console.log(db.data()["room"]);
        setuserroom(db.data()["room"]);
        const res = await firestore.collection(`BillList`).get();
        var temp = [];
        res.forEach((i) => {
          console.log(i.data()["room"]);
          if (db.data()["room"] == i.data()["room"]) {
            temp.push(i.data());
            setuserdata(temp);
            console.log(userdataRef.current);
          }
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [modalRef.current]);

  return (
    <div>
      <Navbar name="Electricity Bill Management" />

      <div className="App">
        <h1>Student</h1>

        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "79.4vh",
          }}
        >
          <Card style={{ width: "50%", padding: "20px" }}>
            <h5>Student : {std_id} </h5>
            <a>ชื่อ : {std_name} </a>
            {check_memberRef.current == true ? (
              <a>ห้อง : {userroomRef.current} </a>
            ) : (
              <Container>
                <a>ห้อง : ไม่มีข้อมูลห้องพัก </a>
                <Button color="info" onClick={toggle}>
                  ลงทะเบียนห้องพัก{" "}
                </Button>
              </Container>
            )}

            <a style={{ fontSize: "20px" }}>ข้อมูลการใช้งาน</a>
            <Container
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "5px",
                justifyContent: "center",
              }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Payment</th>
                    <th>Unit</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {userdataRef.current.map((item) => {
                    console.log(item);
                    return (
                      <tr>
                        <td>{item["payment"]}</td>
                        <td>{item["unit"]}</td>
                        <td>{item["cash"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          </Card>
          <Modal isOpen={modalRef.current} fade={false}>
            <Container>
              <ModalHeader
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Label>ลงทะเบียนห้องพัก</Label>
                  <Label>กรุณาเลือกชั้นและเลขที่ห้องของตัวเอง</Label>
                </Col>
              </ModalHeader>
              <ModalBody>
                <Card>
                  <Container>
                    <FormGroup row>
                      <Label for="FloorFormControlSelect" sm={4}>
                        {" "}
                        Floor Select
                      </Label>
                      <Col>
                        <select
                          class="form-control"
                          id="FloopFormControlSelect"
                          onChange={(e) => handlefloorChange(e)}
                        >
                          {Add1.map((floor, key) => (
                            <option key={key} value={key}>
                              {floor}
                            </option>
                          ))}
                        </select>
                      </Col>
                      {/*  */}
                    </FormGroup>
                    <FormGroup row>
                      <Label for="RoonFormControlSelect" sm={4}>
                        {" "}
                        Room select
                      </Label>
                      <Col>
                        <select
                          class="form-control"
                          id="RoomFormControlSelect"
                          onChange={(e) => handleroomChange(e)}
                        >
                          {Add2.map((temproom, key) => (
                            <option key={key} value={key}>
                              {temproom}
                            </option>
                          ))}
                        </select>
                      </Col>
                    </FormGroup>
                  </Container>
                </Card>
              </ModalBody>
              <Card>
                <Button
                  color="primary"
                  onClick={async () => {
                    const db = firestore.collection("Users");
                    const res = await db
                      .doc(`${std_id}`)
                      .set({ room: `${floorRef.current}${roomRef.current}` });
                    console.log(`${floorRef.current}${roomRef.current}`);
                    console.log("Click and go use camera or update pic !");
                    alert("ลงทะเบียนเสร็จสิ้น !!");
                    toggle();
                    // toggle
                  }}
                >
                  ยืนยัน
                </Button>
                <Button color="danger" onClick={toggle}>
                  ยกเลิก
                </Button>
              </Card>
              <ModalFooter
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></ModalFooter>
            </Container>
          </Modal>
        </Container>
      </div>
    </div>
  );
};
export default Student;
