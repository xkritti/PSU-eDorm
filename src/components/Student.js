import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Appbar'
import { Card } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';


const Student = () => {
    const login = useSelector(state => state.login)
    const std_id = localStorage.getItem('userID')
    const fullname = localStorage.getItem('fullname')

    useEffect(() => {
        console.log(login);
    }, []);

    return (
        <div>
            <Navbar name="Electicity bill For Dromitory" />
            <div style={{ flex: 'dispaly', alignItems: 'center', justifyContent: 'center', height: "83vh" }}>
                <h1>Student </h1>
                <h3>{std_id} : {fullname}</h3>
            </div>
        </div >

    )
}
export default Student;