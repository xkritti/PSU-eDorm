import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Appbar'
import { Card } from 'reactstrap';


const Student = () => {
    const login = useSelector(state => state.login)
    const std_id = localStorage.getItem('userID')

    useEffect(() => {
        console.log(login);
    }, []);

    return (
        <div>
            <Navbar name="Electicity bill For Dromitory" />
            <div className="App">
                <h1>Student</h1>
                <a>
                    {std_id}
                </a>
            </div>
        </div>

    )
}
export default Student;