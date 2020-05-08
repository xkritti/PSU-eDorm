import React from 'react';
import Navbar from './Appbar'
import { Container } from 'reactstrap';

const Admin = () => {
    return (
        <div>
            <Navbar name="Electicity bill For Dromitory" />
            <Container>
                <h1>Admin Page</h1>
                <h1>Your Admin</h1>
            </Container>
        </div>


    )
}
export default Admin;