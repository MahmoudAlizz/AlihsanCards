import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Cards from "./Components/Cards/Cards";
import Employees from "./Components/Employees/Employees";
import CreateEmployee from "./Components/Employees/CreateEmployee";
import EditEmployee from "./Components/Employees/EditEmployee";
import CreateCard from "./Components/Cards/CreateCard";
import EditCard from "./Components/Cards/EditCard";
import "./Css/index.css";

export const App = (props) => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/cards/create" element={<CreateCard />} />
        <Route path="/cards/edit/:id" element={<EditCard />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
