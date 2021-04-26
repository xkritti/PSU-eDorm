import React, { useEffect } from "react";
import CardList from "./CardList";
import "../App.css";
import { Container, Row, Col } from "reactstrap";
import Navbar from "./Appbar";
import { useSelector } from "react-redux";

const Home = () => {
  const login = useSelector((state) => state.login);

  useEffect(() => {
    console.log(login);
  }, []);
  return (
    <div>
      <Navbar name="Electricity Bill Management" />

      <Container>
        <h1 className="display-3">
          Electricity Bill Management System for Dormitory
        </h1>

        <p className="lead">
          เว็บแอปพลิเคชันจดบันทึกปริมาณการใช้ไฟฟ้าและคำนวณค่าใช้ไฟฟ้า
        </p>
      </Container>

      <Container
        fluid={true}
        className="App-body"
        style={{ flexDirection: "row", flexWrap: "wrap" }}
      >
        <CardList
          temp="Agent"
          name="เจ้าหน้าที่จดบันทึก"
          imgurl="https://sv1.picz.in.th/images/2021/04/26/AAgVX1.png"
        />
        <CardList
          temp="AgentBill"
          name="เจ้าหน้าที่ออกใบเสร็จ"
          imgurl="https://sv1.picz.in.th/images/2021/04/26/AAg8kW.png"
        />
        <CardList
          temp="Student"
          name="นักศึกษา"
          imgurl="https://sv1.picz.in.th/images/2021/04/26/AAgHE2.png"
        />
        <CardList
          temp="Admin"
          name="ผู้ดูแลระบบ"
          imgurl="https://sv1.picz.in.th/images/2021/04/26/AAgnLg.png"
        />
      </Container>
    </div>
  );
};
export default Home;
