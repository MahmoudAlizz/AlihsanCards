import Modal from "../Modal";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { DeleteEmployee } from "../../Reducers/EmployeesSlice";
const ViewEmployees = ({ view, data }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const renderView = (data, view) => {
    if (view === "table") {
      let ColSpan = data.map((i) => {
        return i.stores.length;
      }).sort((a, b) => b - a)[0];
      const EmptyCell = (c, i) => {
        if (c - i !== 0) {
          const cells = [];
          for (let t = 0; t < c - i; t++) {
            cells.push(<td key={Math.random()}> ---- </td>);
          }
          return cells.map((i) => i);
        }
        return;
      };
      return (
        <table className="table table-striped text-center table-responsive-lg mt-3">
          <thead className="thead-dark">
            <tr>
              <th rowSpan="2">#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Marred</th>
              <th>Work Hour</th>
              <th>Card</th>
              <th colSpan={ColSpan}>Prices</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data ? data.map((item, index) => {
              return (
                <tr key={item.id} className="m-3">
                  <td className="font-weight-bold">{index + 1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.gender}</td>
                  <td>{item.marred}</td>
                  <td>{item.work}</td>
                  <td>{item.card}</td>
                  {item.stores.map((i, index) => {
                    return (
                      <td key={index}>
                        {i.name} : {i.amount}
                      </td>
                    );
                  })}
                  {EmptyCell(ColSpan, item.stores.length)}
                  <td>
                    <button
                      className="btn btn-danger mr-2"
                      onClick={() => {
                        const root = createRoot(document.querySelector('#modal'));
                        root.render(
                          <div>
                            <Modal
                              message="Are you Sure Delete Employee"
                              action={
                                <>
                                  <button
                                    className="col-2 btn btn-danger btn-sm mr-2"
                                    onClick={() => {
                                      dispatch(DeleteEmployee(item.id));
                                      root.render(<></>)
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="col-2 btn btn-success btn-sm" data-dismiss='alert'
                                    onClick={() => {
                                    }}
                                  >
                                    No
                                  </button>
                                </>
                              }
                            />
                          </div>
                        )
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigate(`/employees/edit/${item.id}`);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr >
              );
            })
              : ''}
          </tbody >
        </table >
      );
    }
    if (view == "cards") {
      return (
        <div className="row justify-content-center mt-2">
          {data.map((item, index) => {
            return (
              <div className="col-md-4 col-sm-5 mb-3" key={item.id}>
                <div className="card">
                  <div className="card-header d-flex justify-content-between ">
                    <div className="card-title mb-0">
                      {`${item.firstname}  ${item.lastname}`}
                    </div>
                    <div className="">{index + 1}</div>
                  </div>
                  <div className="card-body py-1">
                    <div className="d-flex justify-content-between px-4">
                      <div>
                        <p className="mb-1">Gender : {item.gender}</p>
                        <p className="mb-1">Marred : {item.marred}</p>
                      </div>
                      <div>
                        <p className="mb-1">Work Hour :{item.work}</p>
                        <p className="mb-0">Card : {item.card}</p>
                      </div>
                    </div>
                    <table className="table table-sm text-center mb-0">
                      <thead>
                        <tr>
                          {item.stores.map((i, index) => {
                            return <th key={index}>{i.name}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {item.stores.map((i, index) => {
                            return <td key={index}>{i.amount}</td>;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex justify-content-center px-5  py-1">
                    <button
                      className="btn btn-danger mr-2 w-50"
                      onClick={() => {
                        const root = createRoot(document.querySelector('#modal'));
                        root.render(
                          <div>
                            <Modal
                              message="Are you Sure Delete Employee"
                              action={
                                <>
                                  <button
                                    className="col-2 btn btn-danger btn-sm mr-2"
                                    onClick={() => {
                                      dispatch(DeleteEmployee(item.id));
                                      root.render(<></>)
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="col-2 btn btn-success btn-sm" data-dismiss='alert'
                                    onClick={() => {
                                    }}
                                  >
                                    No
                                  </button>
                                </>
                              }
                            />
                          </div>
                        )
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-info w-50"
                      onClick={() => {
                        navigate(`/employees/edit/${item.id}`);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return;
  };
  return <div>{renderView(data, view)}</div>;
};

export default ViewEmployees;
