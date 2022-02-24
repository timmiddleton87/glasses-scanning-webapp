import React from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import DeviceList from "./components/DeviceList";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const FooterScrollLength = () => {
    return "footer scroll";
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="app-main">
        <DeviceList />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default App;
