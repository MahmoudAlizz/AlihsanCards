import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { Field, reduxForm } from 'redux-form'
import { createRoot } from 'react-dom/client'
import { useDispatch, useSelector } from 'react-redux';
import Brand from '../../images/logo.png'
import Qr from '../../images/images.png'
const CardForm = (props) => {
    const [color, setColor] = useState('rgba(229, 229, 228, 0.993)');
    const [cardType, setCardType] = useState("");
    const { handleSubmit } = props;
    const { action } = props;
    const { id } = props;
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const renderError = ({ error, touched }) => {
        if (error && touched) {
            return <small className="text-danger d-block">{error}</small>;
        }
    };
    const [stores, setStores] = useState([
        {
            name: '',
            amount: null
        }
    ])
    const renderInput = ({ input, label, id, type, className, meta }) => {
        return <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} className={className} {...input} />
            {renderError(meta)}
        </div >
    }
    const renderInputWithGroup = ({ input, id, type, className, meta, prepend, append }) => {
        return <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">{prepend}</span>
            </div>
            <input id={id} type={type} className={className} {...input} />
            {append ? <div className="input-group-append">
                <span className="input-group-text">{append}</span>
            </div> : ''}
            {renderError(meta)}
        </div >
    }
    const onsubmit = (p) => {
        const data = { name: p.name, color: color, stores: stores }
        dispatch(action({ id: id, data: data }))
    }
    return (
        <div>
            <div className="row justify-content-center mb-0 mt-4 mx-0">
                <div className="col-6 text-center">
                    <form action="" id='card_form' className='rounded p-3 mt-4' onSubmit={handleSubmit(onsubmit)}>
                        <div className="row">
                            <div className="col-8">
                                <Field type="text" name='name' id="name" className='form-control border-b-info' label="Name" onChange={(e) => {
                                    setCardType(e.target.value)
                                }} component={renderInput} />
                            </div>
                            <div className="col-4">
                                <label htmlFor="c">Color</label>
                                <input type="color" id='c' className='form-control' onChange={(e) => {
                                    setColor(e.target.value)
                                }} />
                            </div>
                        </div>
                        {stores.map((i, index) => {
                            return (
                                <div key={index} className="d-flex justify-content-center">
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <div className='input-group'>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Store Name
                                                </span>
                                            </div>
                                            <input type="text" className='form-control border-b-info' onChange={(e) => {
                                                const s = [...stores];
                                                s.splice(index, 1, { name: e.target.value, amount: stores[index].amount })
                                                setStores(s)
                                            }} />
                                        </div>
                                        <span className='mx-2 align-middle py-1'>:</span>
                                        <div className='input-group'>
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    $
                                                </span>
                                            </div>
                                            <input type="number" className='form-control border-b-info' onChange={(e) => {
                                                const s = [...stores];
                                                s.splice(index, 1, { name: stores[index].name, amount: e.target.value })
                                                setStores(s)
                                            }} />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    .00
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='align-self-center ml-2 mt-2'>
                                        <button onClick={() => {
                                            let d = [...stores];
                                            d.splice(index, 1)
                                            setStores(d)
                                        }} className='border-bottom btn btn-sm btn-danger '>&times;</button>
                                    </div>
                                </div>
                            )
                        })}
                        <a onClick={() => {
                            setStores([...stores, { name: "", amound: 1000 }])
                        }} className="btn btn-secondary px-3 mb-4  mt-2 mx-auto btn-sm" >Add Store  <i className="fa fa-plus"></i></a>
                        <div className="d-flex justify-content-center px-4 mx-4">
                            <button className="btn btn-outline-info w-50 mr-3">Submit <i className='fa fa-send-o'></i></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div id='tCard' className="mt-4 mr-4">
                    <img src={Brand} alt="brand" id='img1' className='img-fluid mx-auto d-block' />
                    <div className="d-flex justify-content-between mx-4">
                        <div className="ml-1 mt-3">
                            <p className='mb-1'>Card Type : <span className='font-weight-bold '>{cardType}</span></p>
                            <p className='mb-0'> Name : </p>
                        </div>
                        <div id="EmployeeImage" className="rounded ">
                            <i className='fa fa-user w-100'></i>
                        </div>
                    </div>
                    <hr />
                    <div className="text-center">
                        <span>22/2/2023</span>
                    </div>
                </div>
                <div id="tCard2" className="mt-4" style={{ background: color }}>
                    <img src={Brand} alt="brand" id='img2' className='img-fluid  d-block' />
                    <img src={Qr} alt="q3" id='img3' className='img-fluid  d-block' />
                </div>
            </div>
        </div>

    )

}


const validate = (p) => {
    const errors = {};
    if (!p.name) {
        errors.name = "You must enter a name";
    }
    return errors;
};

export default reduxForm({ form: 'cardform', validate: validate })(CardForm)