import React from "react";
import { useState, useEffect } from "react";
import { FetchEmployees } from "../Reducers/EmployeesSlice";
import { FetchCards } from "../Reducers/CardsSlice";
import Logo from "../images/logo.png";
import Spinner from "./Spinner";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchEmployees());
    dispatch(FetchCards());
  }, []);
  const employeeData = Object.values(useSelector((s) => s.Employees.data));
  const loading = useSelector((s) => s.Employees.loading);
  const errorMessage = useSelector((s) => s.Employees.errorMessage);
  const cardaData = Object.values(useSelector((s) => s.Cards.data));
  const loading1 = useSelector((s) => s.Cards.loading);
  const errorMessage1 = useSelector((s) => s.Cards.errorMessage);

  const renderCountEmployee = () => {
    if (loading) {
      return (
        <span>
          <i
            className="fa-duotone fa fa-spinner fa-lg ml-4 fa-spin"
            style={{ color: "#FFFFF" }}
          ></i>
        </span>
      );
    }
    if (errorMessage != "") {
      return <span>Error</span>;
    }

    return <span className="text-white number">{employeeData.length}</span>;
  };
  const renderCountCards = () => {
    if (loading1) {
      return (
        <span>
          <i
            className="fa-duotone fa fa-spinner fa-lg ml-4 fa-spin"
            style={{ color: "#FFFFF" }}
          ></i>
        </span>
      );
    }
    if (errorMessage1 != "") {
      return <span>Error</span>;
    }

    return <span className="text-white number">{cardaData.length}</span>;
  };
  return (
    <div className="bg-p1">
      <div className="text-center pt-3">
        <img src={Logo} alt="" />
      </div>
      <div className="row justify-content-center mt-3">
        <div className="bg-success col-3 text-center box1 ">
          <h3 className="text-center text-white pt-4">Employees</h3>
          <span>
            <i className="fas fa-users"></i>
          </span>
          {renderCountEmployee()}
          <Link
            to="/employees"
            className="btn btn-outline-light  mx-auto mt-3 d-block w-50"
          >
            View
          </Link>
        </div>
        <div className="bg-primary col-3 text-center offset-3 box1 mb-5">
          <h3 className="text-center text-white pt-4">Cards</h3>
          <span>
            <i className="fa fa-credit-card-alt"></i>
          </span>
          {renderCountCards()}

          <Link
            to="/cards"
            className="btn btn-outline-light  w-50 mx-auto mt-3 d-block"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
