import React from "react";
import EmployeeForm from "./EmployeeForm";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FetchEmployee,
  EditEmployee as Edit,
} from "../../Reducers/EmployeesSlice";
import { useEffect } from "react";
import _ from "lodash";
import Spinner from "../Spinner";

const renderView = (loading, errorMessage, id, employee) => {
  if (loading) {
    return <Spinner />
  }
  if (errorMessage) {
    return <div className="text-center text-danger">{errorMessage}</div>
  }
  return <EmployeeForm
    initialValues={_.pick(
      employee,
      "firstname",
      "lastname",
      "work",
      "gender",
      "marred"
    )}
    action={Edit}
    id={id}
  />
}

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(i => i.Employees.loading)
  const errorMessage = useSelector(i => i.Employees.errorMessage)
  const id = useParams().id;
  useEffect(() => {
    dispatch(FetchEmployee(id));
  }, []);
  const employee = useSelector((s) => s.Employees.data[id]);
  return (
    <div>
      <div className="card-header">
        <div className="card-title mb-0 text-center">Edit Employees</div>
      </div>
      {renderView(loading, errorMessage, id, employee)}
    </div>
  );
};

export default EditEmployee;
