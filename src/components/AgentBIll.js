import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "reactstrap/lib/Container";
import Table from "reactstrap/lib/Table";
import Navbar from "./Appbar";

const AgentBill = () => {
  const login = useSelector((state) => state.login);

  useEffect(() => {
    console.log(login);
  }, []);

  return (
    <div>
      <Navbar name="Electricity Bill Management" />
      <div className="App">
        <h1>AgentBill</h1>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            height: "79.5vh",
          }}
        >
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Username</th>
                <th>Room</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
};
export default AgentBill;
