import React from "react";
import EmployeeForm from "./EmployeeForm";
import { AddEmployee } from "../../Reducers/EmployeesSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";
const CreaeteEmployee = () => {
  const loading = useSelector(i => i.Employees.loading)
  const errorMessage = useSelector(i => i.Employees.errorMessage)
  const renderView = (loading, errorMessage) => {
    if (loading) {
      return <Spinner />
    }
    if (errorMessage) {
      return <div className="text-center text-danger">{errorMessage}</div>
    }
    return <EmployeeForm action={AddEmployee} />
  }
  return (
    <div>
      <div className="card-header">
        <div className="card-title mb-0 text-center">Add Employees</div>
      </div>
      {renderView(loading, errorMessage)}
    </div>
  );
};

export default CreaeteEmployee;
