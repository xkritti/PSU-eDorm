import React from 'react';
import Navbar from './Appbar'
import { Container } from 'reactstrap';

const Admin = () => {
    return (
        <div>
            <Navbar name="Electicity bill For Dromitory" />
            <Container style={{ flex: 'dispaly', alignItems: 'center', justifyContent: 'center', height: "83vh" }}>
                <h1>Admin Page</h1>
            </Container >
        </div >


    )
}
export default Admin;