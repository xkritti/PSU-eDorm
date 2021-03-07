import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Container, InputGroupText, FormGroup, Label } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom'
import { listAction } from './redux/store'
import { connect, useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const Action = bindActionCreators(listAction, dispatch)
  let TestID;
  let fullname;

  const [loginData, setLogindata] = useState({
    username: undefined,
    password: undefined
  })

  const [testloginData, setTestloginData] = useState({
    username: '5935512001',
    password: '!coe28361psu'
  })


  useEffect(() => {
    console.log(login);
    if (login.id) {
      TestID = login.id
      fullname = login.username +' '+ login.surname
      localStorage.setItem('userID', TestID)
      localStorage.setItem('fullname', fullname)
      let test = localStorage.getItem('userID')
      console.log(test);
      setTimeout(() => {
        props.history.push('/')
      }, 1000)
    }

  }, [login]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '92.5vh',
      backgroundImage: "url(" + "https://images.wallpaperscraft.com/image/bulbs_chandelier_electricity_126301_3840x2400.jpg" + ")",
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: "145%"
    }}>

      <Card style={{ width: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <a style={{ marginTop: '20px', fontSize: '20px' }}>LOGIN PSU PASSPORT</a>
        <Form>
          <FormGroup row>
            <Label>Username</Label>
            <Input type="username" name="username" id="exampleUsername" placeholder="username"
              onChange={(e) => {
                setLogindata({ ...loginData, username: (e.target.value) })
                console.log(loginData);
              }} />
          </FormGroup>
          <FormGroup row>
            <Label>Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password "
              onChange={(e) => {
                setLogindata({ ...loginData, password: (e.target.value) })
                console.log(loginData);
              }} />
          </FormGroup>
        </Form>
        <Button color='primary' style={{ marginBottom: '15px' }}
          onClick={() => {
            console.log(loginData);
            Action.login(loginData);
          }}>
          Login
        </Button>
      </Card>
    </div >

  )
}

const mapStateToProps = state => ({ login: state.login })

export default connect(mapStateToProps)(Login);