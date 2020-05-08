import React from 'react';
import './App.css';
import Navbar from './components/Appbar'
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Agent from './components/Agent';
import AgentBill from './components/AgentBIll';
import Admin from './components/Admin';
import Student from './components/Student';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/Login" component={LoginPage} />
        <Route exact path="/" component={Home} />
        <Route exact path="/Agent" component={Agent} />
        <Route exact path="/AgentBill" component={AgentBill} />
        <Route exact path="/Student" component={Student} />
        <Route exact path="/Admin" component={Admin} />
      </Switch>
      <div className="App-footer">
        <p style={
          {
            marginTop: "2vh",
          }
        }>
          Prince of Songkla University, Phuket Campus
  </p>

      </div>
    </div>

  )
}
export default App;
