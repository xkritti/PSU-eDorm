import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  // NavItem,
  // NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  Col
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAction } from './redux/store';

const Appbar = (props) => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const history = useHistory();
  const Action = bindActionCreators(listAction, dispatch)
  const [isOpen, setIsOpen] = useState(false);
  const [Idpsupass, setIdpsupass] = useState(null)
  const toggle = () => setIsOpen(!isOpen);
  const name = props.name;

  useEffect(() => {
    let user = localStorage.getItem('userID');
    setIdpsupass(user)
    if (user == null || undefined) {
      history.push('/Login')
    }
  }, [Idpsupass])


  const logouts = () => {
    localStorage.clear()
    let user = undefined
    setIdpsupass(user)
    Action.logout()
    if (user === undefined) {
      setTimeout(() => {
        history.push('/login')
      }, 1000)
    }
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{name}</NavbarBrand>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu >
                <Link to="/Agent"> <DropdownItem >Agent</DropdownItem> </Link>
                <Link to="/AgentBill"><DropdownItem>Agent Bill</DropdownItem></Link>
                <Link to="/Student"><DropdownItem>Student</DropdownItem></Link>
                <Link to="/Admin"> <DropdownItem>Admin</DropdownItem> </Link>
                <DropdownItem divider />
                <Link to="/"><DropdownItem>Home</DropdownItem></Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Crate by Krittamet CoE#15</NavbarText><br />
          <Button size="sm" onClick={logouts}>logout</Button>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Appbar;