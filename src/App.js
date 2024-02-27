import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route } from "react-router-dom";
import Router from "./Routes/router";
import Create from "./Routes/create";
import Read from "./Routes/read";
import Update from "./Routes/update";
import Delete from "./Routes/delete";
import Notfound from "./Routes/notfound";
function App() {
  const [date, setDate] = React.useState("")
  React.useEffect(()=>{
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  setDate( today.toLocaleDateString("en", options))
  },[])
  
  return (
    <div className="App">
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-dark">
        <Container>
          <Navbar.Text>PRAATHEE MEDIA Pvt. Ltd.</Navbar.Text>
          <Navbar.Brand >Employees Dashboard</Navbar.Brand>
          <Navbar.Text>{date}</Navbar.Text>
        </Container>
      </Navbar>
<Router />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Create />} />
        <Route path="/find" element={<Read />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>

    </div>
  );
}

export default App;
