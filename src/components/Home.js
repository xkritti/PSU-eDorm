import React, { useEffect } from 'react';
import CardList from './CardList';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import Navbar from './Appbar'
import { useSelector } from 'react-redux';


const Home = () => {
  const login = useSelector(state => state.login)


  useEffect(() => {
    console.log(login);
  }, [])
  return (

    <div >
      <Navbar name="Electicity bill For Dromitory" />

      <Container >
        <h1 className="display-3">Electicity Bill For Dormitory</h1>

        <p className="lead">เว็บแอปพลิเคชันจดบันทึกปริมาณการใช้ไฟฟ้าและคำนวณค่าใช้ไฟฟ้า</p>
      </Container>


      <Container fluid={true} className="App-body" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <CardList temp="/Agent" name="เจ้าหน้าที่จดบันทึก" imgurl="https://cdn0.iconfinder.com/data/icons/web-user-interface-7/130/48-512.png" />
        <CardList temp="/AgentBill" name="เจ้าหน้าที่ออกใบเสร็จ" imgurl="https://i.ya-webdesign.com/images/money-falling-from-the-sky-png-1.png" />
        <CardList temp="/Student" name="นักศึกษา" imgurl="https://www.tutorgun.com/images/term_student.png" />
        <CardList temp="/Admin" name="ผู้ดูแลระบบ" imgurl="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254002/80-512.png" />
      </Container>
    </div>
  )
}
export default Home;
