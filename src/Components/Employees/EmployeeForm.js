import { Field, reduxForm } from "redux-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchCards } from "../../Reducers/CardsSlice";
const EmployeeForm = (props) => {
  const dispatch = useDispatch();
  const { action, handleSubmit, id, reset } = props;
  useEffect(() => {
    dispatch(FetchCards());
  }, []);
  const renderError = ({ error, touched }) => {
    if (error && touched) {
      return <small className="text-danger d-block">{error}</small>;
    }
  };
  const renderInput = ({ label, className, input, id, meta, type }) => {
    return (
      <>
        <label htmlFor={id}>{label}</label>
        <input {...input} type={type} id={id} className={className} />
        {renderError(meta)}
      </>
    );
  };
  const onSubmit = (s) => {
    const data = { ...s, card: document.querySelector("#select").value };
    dispatch(action({ id: id, data }));
    reset()
  };
  const cardTypes = Object.values(useSelector((s) => s.Cards.data)).map(
    (item) => item.name
  );

  return (
    <div>
      <div id="" className="row justify-content-center m-0 mt-4">
        <div className="col-6">
          <form action="" id="form_Employee" autoComplete='off' className=" border rounded p-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <Field
                  name="firstname"
                  className="form-control border-b-info"
                  label="First Name"
                  type="text"
                  id="firstname"
                  component={renderInput}
                />
              </div>
              <div className="col">
                <Field
                  name="lastname"
                  className="form-control border-b-info"
                  label="Last Name"
                  type="text"
                  id="lastname"
                  component={renderInput}
                />
              </div>
            </div>
            <Field
              name="work"
              className="form-control border-b-info"
              step="2"
              min="5"
              max="100"
              type="number"
              label="Work Hour"
              id="workhour"
              component={renderInput}
            />
            <div className="my-2 ">
              <span className="mr-2 ">Gender :</span>
              <Field
                name="gender"
                className="mx-2 align-middle"
                type="radio"
                label="Male"
                id="male"
                value="male"
                component={renderInput}
              />
              <Field
                name="gender"
                className="ml-2 align-middle"
                type="radio"
                label="Female"
                id="female"
                value="female"
                component={renderInput}
              />
            </div>
            <select id="select" className="form-control border-b-info">
              {cardTypes.map((item) => (
                <option key={Math.random()} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="my-3">
              <span className="mr-2">Marred :</span>
              <Field
                name="marred"
                className="mx-2 align-middle"
                type="radio"
                label="Yes"
                id="yesmarred"
                value="yes"
                component={renderInput}
              />
              <Field
                name="marred"
                className="ml-2 align-middle"
                type="radio"
                label="No"
                id="nomarred"
                value="no"
                component={renderInput}
              />
            </div>
            <div className="d-flex justify-content-center px-4 mx-4">
              <button className="btn btn-outline-info w-50 mr-3">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const validate = (p) => {
  const errors = {};
  if (!p.firstname) {
    errors.firstname = "You must enter a first name";
  }
  if (!p.lastname) {
    errors.lastname = "You must enter a last name";
  }
  if (!p.work) {
    errors.work = "You must enter work hour";
  }
  if (p.work && p.work < 10) {
    errors.work = "You must work hour > 10h";
  }
  return errors;
};

export default reduxForm({ form: "EEmployee_form", validate: validate })(
  EmployeeForm
);
