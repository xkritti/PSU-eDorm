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
        <CardList temp="Agent" name="เจ้าหน้าที่จดบันทึก" imgurl="https://www.kl.ac.th/wp-content/uploads/2020/11/doc.png" />
        <CardList temp="AgentBill" name="เจ้าหน้าที่ออกใบเสร็จ" imgurl="https://www.pngrepo.com/download/271910/money-icons.png" />
        <CardList temp="Student" name="นักศึกษา" imgurl="https://image.flaticon.com/icons/png/512/201/201818.png" />
        <CardList temp="Admin" name="ผู้ดูแลระบบ" imgurl="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/settings-3-icon.png" />
      </Container>
    </div>
  )
}
export default Home;
