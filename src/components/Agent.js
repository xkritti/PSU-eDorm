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
import axios from "axios";
import ReactLoading from "react-loading";

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
  const [scanstatus, setscanstatus, scanstatusRef] = useState(false);
  // unitformscan
  const [unitformscan, setunitformscan, unitformscanRef] = useState(null);
  const [roomscan, setroomscan, roomscanRef] = useState(null);
  const [floorscan, setfloorscan, floorscanRef] = useState(null);
  const [datescan, setdatescan, datescanRef] = useState(null);
  const [focusdate, setfocusdate, focusdateRef] = useState(false);
  const [loadmodal, setloadmodal, loadmodalRef] = useState(false);
  const [base64, setBase64,dataBase64] = useState("");

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString))
    console.log(dataBase64.current)
  }

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
      cash: 0,
      payment: mmyy,
      date: ddmmyy,
      images: base64,
    };

    let temp = [];

    let bf_db = await firestore.collection("BillList").get();
    bf_db.forEach((doc) => {
      temp.push(doc.data());
    });
    let result = temp.filter(
      (doc) => doc.room == _room && doc.payment == `0${mm - 1}-${yy}`
    );
    if (result.length > 0) {
      data.cash = Math.abs(unit - result[0].unit) * 5;
    }

    await firestore
      .collection("BillList")
      .doc()
      .set(data)
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
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
          {unit == null ? (
            <p>Room :</p>
          ) : (
            <p>
              Room : {floor}
              {room} จดได้ {unit} Unit
            </p>
          )}
          <hr />
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "400px",
            }}
          >
            <FormGroup row>
              <Label for="FloorFormControlSelect" sm={2}>
                {" "}
                วันที่
              </Label>
              <Col>
                {datescan != null ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "green",
                    }}
                  >
                    ข้อมูลจากการแสกน : {date}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {/* ข้อมูลจากการแสกน : - */}
                  </p>
                )}
                <Input
                  placeholder={date == null ? "dd/mm/yy" : date}
                  type={focusdate ? "date" : "text"}
                  // type="text"
                  // onfocus={(e)=>{
                  //   console.log(e)
                  // }}
                  onClick={(e) => {
                    if (date == null) {
                      setfocusdate(true);
                    }
                  }}
                  style={{ marginBottom: "10px" }}
                  onChange={(e) => {
                    setdate(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="FloorFormControlSelect" sm={2}>
                {" "}
                Floor Select
              </Label>

              <Col>
                {roomscan != null ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "green",
                    }}
                  >
                    ข้อมูลจากการแสกน : {roomscan}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {/* ข้อมูลจากการแสกน : - */}
                  </p>
                )}
                <select
                  class="form-control"
                  id="FloopFormControlSelect"
                  onChange={(e) => handlefloorChange(e)}
                >
                  <option hidden value="">
                    {floor}
                  </option>
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
                {floorscan != null ? (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "green",
                    }}
                  >
                    ข้อมูลจากการแสกน : {floorscan}
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {/* ข้อมูลจากการแสกน : - */}
                  </p>
                )}
                <select
                  class="form-control"
                  id="RoomFormControlSelect"
                  onChange={(e) => handleroomChange(e)}
                >
                  <option hidden value="">
                    {room}
                  </option>
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
                {unitformscan != null ? (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "green",
                    }}
                  >
                    ข้อมูลจากการแสกน : {unitformscan}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    {/* ข้อมูลจากการแสกน : - */}
                  </p>
                )}
                <p></p>
                <Input
                  type="number"
                  placeholder={unit != null ? unit : "กรุณากรอกยูนิตการใช้งาน"}
                  onChange={(e) => {
                    if (scanstatus == true) {
                      e.target.value = unit;
                      setscanstatus(!scanstatus);
                    }
                    setunit(e.target.value);
                  }}
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

                    let file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = _handleReaderLoaded
                      reader.readAsBinaryString(file)
                    }

                    console.log(picRef.current);
                    var date = picRef.current.lastModifiedDate;
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var day = date.getDate();
                    setdatescan(`${year}-${month + 1}-${day}`);
                    setdate(`${year}-${month + 1}-${day}`);
                    console.log(`${year}-${month + 1}-${day}`);

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
                    setloadmodal(true);
                    const res = await axios(config);
                    var x = res.data["data"];
                    setunit(parseInt(x["unit"]));
                    setunitformscan(parseInt(x["unit"]));

                    setroomscan(x["room"].slice(0, 1));
                    setfloorscan(parseInt(x["room"].slice(1)));
                    setfloor(x["room"].slice(0, 1));
                    setroom(parseInt(x["room"].slice(1)));
                    console.log(unitRef.current);
                    console.log(res.data["msg"]);
                    if (res.data["msg"] == "success!!") {
                      // alert(res.data["msg"]);
                      setscanstatus(!scanstatus);
                      setloadmodal(false);
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
          <Modal isOpen={loadmodal} fade={false} centered>
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReactLoading
                type="bars"
                color="#0000CD"
                height={100}
                width={100}
              />
            </Container>
          </Modal>
        </Container>
      </div>
    </div>
  );
};
export default Agent;
