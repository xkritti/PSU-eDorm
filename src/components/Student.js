import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Appbar";
import { Card, Row, Col } from "reactstrap";
import Container from "reactstrap/lib/Container";

const Student = () => {
  const login = useSelector((state) => state.login);
  const std_id = localStorage.getItem("userID");
  const std_name = localStorage.getItem("Name");

  useEffect(() => {
    console.log(login);
  }, []);

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
            <a>ห้อง : {std_id} </a>
            <a style={{ fontSize: "20px" }}>ข้อมูลการใช้งาน</a>
            <Container
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "5px",
                justifyContent: "center",
              }}
            >
              {/* {whatjoin()} */}
            </Container>
          </Card>
        </Container>
      </div>
    </div>
  );
};
export default Student;
