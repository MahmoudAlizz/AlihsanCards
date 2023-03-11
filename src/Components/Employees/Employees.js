import React, { useState, useEffect } from "react";
import { FetchEmployees } from "../../Reducers/EmployeesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { search } from '../../Reducers/EmployeesSlice'
import View from "./ViewEmployees.js";
import Spinner from "../Spinner";
import Search from "../Search";
import FilterEmployee from "./FilterEmployee";


const Employees = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchEmployees());
  }, []);
  const employeeData = Object.values(useSelector(s => s.Employees.dataAfterFilter));
  const navigate = useNavigate();
  const searchData = Object.values(useSelector(s => s.Employees.dataSearch))
  const isDataSearch = useSelector(s => s.Employees.isSearch)
  const { loading } = useSelector((s) => s.Employees);
  const { errorMessage } = useSelector((s) => s.Employees);
  const [view, setView] = useState("table");
  const renderView = (loading, employeeData, errorMessage, searchData, isDataSearch) => {
    if (isDataSearch == true) {
      if (Object.values(searchData).length != 0) {
        return <View view={view} data={searchData} />;
      }
      return <div className=" mt-4">
        <p className="py-1 text-center text-danger">No Employee have First name</p>
        <button className="btn btn-secondary d-block mx-auto" onClick={() => {
          document.querySelector("#search").value = ""
          document.querySelector("#searchbtn").click();
        }}>Show All Employees <i className="fa fa-arrow-alt-circle-down"></i></button>
      </div>
    }
    if (errorMessage) return <div className="text-danger">{errorMessage}</div>;
    if (loading) return <Spinner />;
    if (employeeData.length > 0)
      return <View view={view} data={employeeData} />;
    else return <div className="text-center text-danger font-weight-bold">No Employee</div>;
  };

  return (
    <div className="containerMain ">
      <div className="container">
        <Search placeHolder="Search Employee" data={employeeData} dis={(e) => {
          dispatch(search(e))
        }} filterBy='firstname' />
        <div className="row justify-content-center ">
          <div className="col-md-6 col-sm-8  my-2 d-flex align-items-cente">
            <p className="font-weight-bold text-primary mb-0 pr-2 py-1">
              View By :{" "}
            </p>
            <select
              className="w-75 rounded border-primary"
              name="views"
              id=""
              onChange={(e) => {
                setView(e.target.value);
              }}
            >
              <option className="text-primary" value="table">
                Table
              </option>
              <option className="text-primary" value="cards">
                Cards
              </option>
            </select>
          </div>
          <button
            onClick={() => {
              navigate("/employees/create");
            }}
            className="col-md-5 col-sm-4 w-75 btn btn-outline-primary my-2 btn-sm"
          >
            Add Employee
          </button>
        </div>
        <hr />
      </div>
      <div className="row">
        <div className="col-10">
          {renderView(loading, employeeData, errorMessage, searchData, isDataSearch)}
        </div>
        <div className="col-2 bg-light mt-3 px-0">
          <FilterEmployee />
        </div>
      </div>
    </div>
  );
};
export default Employees