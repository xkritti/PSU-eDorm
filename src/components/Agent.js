import React, { useState, useEffect } from "react";
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
import Navbar from "./Appbar";
import { firestore } from "../index";
import firebase from "firebase/app";

const Agent = () => {
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

  const [floor, setfloor] = useState(null);
  const [room, setroom] = useState(null);
  const [date, setdate] = useState(null);
  const [unit, setunit] = useState(null);

  const createBillList = () => {
    firestore
      .collection("BillList")
      .doc(room + floor + "")
      .set({
        date: date,
        unit: unit,
        cash: unit * 5,
      });
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {}, []);

  return (
    <div>
      <Navbar name="Electricity Bill Management" />
      <div className="App">
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "83.5vh",
          }}
        >
          <h3>จดบันทึกวันที่ {date}</h3>
          <p>
            Room : {floor}
            {room} Use {unit} Unit
          </p>
          <hr />
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "400px",
            }}
          >
            <Input
              type="date"
              style={{ marginBottom: "10px" }}
              onChange={(e) => {
                setdate(e.target.value);
                console.log(e.target.value);
              }}
            ></Input>
            <FormGroup row>
              <Label for="FloorFormControlSelect" sm={2}>
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
              <Label for="RoonFormControlSelect" sm={2}>
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
            <FormGroup row>
              <Label for="ValueofUnit" sm={2}>
                {" "}
                Value{" "}
              </Label>
              <Col>
                <Input
                  type="number"
                  placeholder="Value of Unit"
                  onChange={(e) => setunit(e.target.value)}
                ></Input>
              </Col>
            </FormGroup>
            <Button
              color="success"
              onClick={() => {
                if (
                  floor != null &&
                  room != null &&
                  date != null &&
                  unit != null
                ) {
                  createBillList();
                  setTimeout(() => {
                    alert("susscess");
                    window.location.reload();
                  }, 1500);
                } else {
                  alert("error !");
                  console.log("err");
                }
              }}
            >
              Submit
            </Button>
          </Form>
          <hr />
          <Button color="primary" onClick={toggle}>
            scanner {/* {buttonLabel} */}
          </Button>
          <Modal isOpen={modal} fade={false}>
            <Container>
              <ModalHeader
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col>
                  <Label>Image Scanner</Label>
                  <Label>กรุณาจัดภาพจากกล้องให้ตรงกรอบ</Label>
                </Col>
              </ModalHeader>
              <ModalBody>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="https://sv1.picz.in.th/images/2021/04/26/AARi2Z.png"
                  />
                </Card>
              </ModalBody>
              <Card>
                <Button color="primary" onClick={toggle}>
                  Scan
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
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
export default Agent;
