import React, { useEffect } from "react";
import useState from "react-usestateref";
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
import axios from "axios";

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

  const [floor, setfloor, floorRef] = useState(null);
  const [room, setroom, roomRef] = useState(null);
  const [date, setdate, dateRef] = useState(null);
  const [unit, setunit, unitRef] = useState(null);
  const [pic, setpic, picRef] = useState();

  const createBillList = async () => {
    const sDate = date.split("-");
    const yy = sDate[0];
    const mm = sDate[1];
    const dd = sDate[2];
    const ddmmyy = `${dd}-${mm}-${yy}`;
    const mmyy = `${mm}-${yy}`;
    let _room = `${floor}${room}`;

    // Add a new document in collection "cities" with ID 'LA'

    const data = {
      room: _room,
      unit: unit * 1,
      cash: unit * 5,
      payment: mmyy,
      date: ddmmyy,
    };
    await firestore
      .collection("BillList")
      .doc()
      .set(data)
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
    // const db = firestore.collection("BillList").doc("test");
    // db.set(data).catch((err) => {
    //   console.log(err);
    //   return false;
    // });
    // db.doc(mmyy)
    //   .collection(_room)
    //   .doc(ddmmyy)
    //   .set(data)
    //   .catch((err) => {
    //     alert(err);
    //     return false;
    //   });
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
              onClick={async () => {
                if (
                  floor != null &&
                  room != null &&
                  date != null &&
                  unit != null
                ) {
                  const res = await createBillList();
                  if (res) {
                    alert("บันทึกข้อมูลสำเร็จ");
                    window.location.reload();
                  } else {
                    alert("error ! : โปรดลองใหม่อีกครั้ง");
                  }
                } else {
                  alert("error ! : โปรดกรอกข้อมูลให้ครบถ้วน");
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
                <input
                  type="file"
                  onChange={async (event) => {
                    setpic(event.target.files[0]);
                    console.log(picRef.current);
                    console.log(picRef.current.name);
                    var db = new FormData();
                    db.append("file", picRef.current, picRef.current.name);
                    var config = {
                      method: "post",
                      url: "https://ocrxfastapi.herokuapp.com/upload_to_orc",
                      headers: {
                        accept: "application/json",
                        "Content-Type": "multipart/form-data",
                      },
                      data: db,
                    };
                    const res = await axios(config);
                    // const res = await axios.post(
                    //   `https://ocrxfastapi.herokuapp.com/upload_to_orc_upload_to_orc_post`,
                    //   db,
                    //   {
                    //     headers: {
                    //       'content-type': 'multipart/form-data'
                    //     },
                    //   }
                    // );
                    var x = res.data["data"];
                    console.log(x);
                    setunit(parseInt(x["unit"]));
                    console.log(unitRef.current);
                    if (res.data["msg"] == '"success!!"') {
                      alert(res.data["msg"]);
                      toggle();
                    } else {
                      alert(res.data["msg"]);
                      toggle();
                    }
                  }}
                />
                <Button
                  color="primary"
                  onClick={() => {
                    console.log("Click and go use camera or update pic !");
                    // toggle
                  }}
                >
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
