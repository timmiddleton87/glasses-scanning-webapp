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
import useWindowDimensions from "./components/WindowDims";

const defaultData = {
  devices: MOCK_DATA,
  performance: {},
};

createStore(defaultData, {
  name: "bfgStore",
  storageType: localStorage,
});

function App() {
  const { height, width } = useWindowDimensions();
  return (
    <StateMachineProvider>
      {width + height > 1500 && (
        <>
          {width >= height && (
            <>
              <Container fluid>
                <Row className="app_header">
                  <Col sm>
                    <h4>Glasses Tracker</h4>
                    <LiveTime />
                  </Col>
                  <Col sm={7}>
                    <PerformanceInfo />
                  </Col>
                  <Col sm>
                    <h4>
                      Available: <DeviceCounter searchstatus={0} />
                    </h4>
                    <h4>
                      Out Now: <DeviceCounter searchstatus={1} />
                    </h4>
                    <h4>
                      Returned: <DeviceCounter searchstatus={2} />
                    </h4>
                  </Col>
                </Row>
                <Row className="app_body">
                  <TableFeeder />
                </Row>
              </Container>
              <Navbar fixed="bottom" className="app_footer">
                <Footer resetdata={defaultData} />
              </Navbar>
            </>
          )}
          {width < height && (
            <div className="orientation_warning">
              <h1>Please rotate your device!</h1>
            </div>
          )}
        </>
      )}
      {width + height < 1500 && (
        <div className="orientation_warning">
          <h1>Please use a tablet or PC</h1>
        </div>
      )}
    </StateMachineProvider>
  );
}

export default App;
