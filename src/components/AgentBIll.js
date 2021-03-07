import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Appbar'

const AgentBill = () => {

    const login = useSelector(state => state.login)


    useEffect(() => {
        console.log(login);
    }, []);

    return (
        <div>
            <Navbar name="Electicity bill For Dromitory" />
            <div style={{ flex: 'dispaly', alignItems: 'center', justifyContent: 'center', height: "83vh" }}>
                <h1 style={{ color:'ButtonText',fontSize:"55px"}}>AgentBill</h1>
            </div>
        </div>

    )
}
export default AgentBill;