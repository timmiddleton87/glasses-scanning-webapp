import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { LiveTime } from "./components/TimeDisplay";
import PerformanceInfo from "./components/PerformanceInfo";
import Footer from "./components/Footer";
import MOCK_DATA from "./components/MOCK_DATA.json";
import { StateMachineProvider, createStore } from "little-state-machine";
import TableFeeder from "./components/TableFeeder";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { DeviceCounter } from "./components/IssuedCounter";

const defaultData = {
  devices: MOCK_DATA,
  performance: {},
};

createStore(defaultData, {
  name: "bfgStore",
  storageType: localStorage,
});

function App() {
  return (
    <StateMachineProvider>
      <Container fluid>
        <Row className="app_header">
          <Col sm>
            <h1>Glasses Tracker</h1>
            <LiveTime />
          </Col>
          <Col sm={6}>
            <PerformanceInfo />
          </Col>
          <Col sm>
            <h3>
              Not Used: <DeviceCounter searchstatus={0} />
            </h3>
            <h3>
              Issued: <DeviceCounter searchstatus={1} />
            </h3>
            <h3>
              Returned: <DeviceCounter searchstatus={2} />
            </h3>
          </Col>
        </Row>
        <Row className="app_body">
          <TableFeeder />
        </Row>
      </Container>
      <Navbar fixed="bottom" className="app_footer">
        <Footer resetdata={defaultData} />
      </Navbar>
    </StateMachineProvider>
  );
}

export default App;
