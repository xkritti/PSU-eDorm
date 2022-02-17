import React, { useEffect } from "react";
import useState from "react-usestateref";
import { useSelector } from "react-redux";
import Container from "reactstrap/lib/Container";
import Table from "reactstrap/lib/Table";
import Navbar from "./Appbar";
import { firestore } from "../index";
import firebase from "firebase";
import { CSVLink } from "react-csv";
import Row from "reactstrap/lib/Row";
import {
  Button,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap";
import { VscEdit } from "react-icons/vsc";
import { TiDelete } from "react-icons/ti";

const Admin = () => {
  var [Data, setData, dataRef] = useState([]);
  var [modal, setModal, dataRefModal] = useState(false);
  var [delmodal, setDelModal, dataRefDelModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const Deltoggle = () => setDelModal(!delmodal);
  let temp = [];
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
      <Container>
        <h1>Admin Page</h1>
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
              {dataRef.current.map((item) => {
                return (
                  <tr>
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
                            console.log(item);
                            toggle();
                          }}
                        >
                          <VscEdit />
                          <p>edit</p>
                        </Button>
                        <Modal isOpen={modal} fade={false} size="lg" centered>
                          <ModalHeader toggle={toggle}>
                            แก้ไขข้อมูลห้อง {item["room"]}{" "}
                          </ModalHeader>
                          <ModalBody>
                            <Container>
                              วันที่ : {item["date"]} <br />
                              <FormGroup>
                                <Label>ปริมาณการใช้ :</Label>
                                <Input
                                  name="unit"
                                  placeholder={item["unit"]}
                                  type="number"
                                />
                              </FormGroup>
                              <br />
                              มีรูปแสดงที่ถ่ายมาไว้เช็ค โดยโชว์ของเดือนนั้นๆ
                            </Container>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={toggle}>
                              บันทึก
                            </Button>{" "}
                            <Button onClick={toggle}>ยกเลิก</Button>
                          </ModalFooter>
                        </Modal>
                        <Button
                          color="danger"
                          style={{
                            height: "55px",
                            width: "55px",
                          }}
                          onClick={Deltoggle}
                        >
                          <TiDelete />
                          <p>del</p>
                        </Button>
                        <Modal
                          isOpen={delmodal}
                          fade={false}
                          size="lg"
                          centered
                        >
                          <ModalHeader toggle={Deltoggle}>
                            ลบข้อมูล ห้อง {item["room"]} วันที่ {item["date"]} ?{" "}
                          </ModalHeader>
                          <ModalFooter>
                            <Button color="danger" onClick={Deltoggle}>
                              ลบข้อมูล
                            </Button>{" "}
                            <Button onClick={Deltoggle}>ยกเลิก</Button>
                          </ModalFooter>
                        </Modal>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Container>
    </div>
  );
};
export default Admin;
