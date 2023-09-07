import React from 'react'
import { useNavigate } from 'react-router';
import { createRoot } from 'react-dom/client';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { DeleteCard } from '../../Reducers/CardsSlice';

const ViewCards = ({ data, view }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const renderView = (data, view) => {
        if (view == "table") {
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
            return (<table className=' col text-center table table-striped'>
                <thead className='thead-dark'>
                    <tr>
                        <th>#</th>
                        <th>Card Name</th>
                        <th>Color</th>
                        <th colSpan={ColSpan}>Prices</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? data.map((i, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{i.name}</td>
                                <td className="">
                                    <div className="border border-dark w-75 mx-auto rounded" style={{ background: i.color, height: '30px' }}></div>
                                </td>
                                {i.stores.map((item, index) => {
                                    return (
                                        <td key={index}>{item.name ? <>{item.name} : {item.amount}</> : '----'}</td>
                                    )
                                })}
                                {EmptyCell(ColSpan, i.stores.length)}
                                <td className='d-flex justify-content-center'>
                                    <button className="btn btn-info mr-2" onClick={() => {
                                        navigate(`/cards/edit/${i.id}`)
                                    }}>Edit</button>
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={() => {
                                            const root = createRoot(document.querySelector('#modal'));
                                            root.render(
                                                <div>
                                                    <Modal
                                                        message="Are you Sure Delete Card"
                                                        action={
                                                            <>
                                                                <button
                                                                    className="col-2 btn btn-danger btn-sm mr-2"
                                                                    onClick={() => {
                                                                        dispatch(DeleteCard(i.id));
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
                                </td>
                            </tr>
                        )
                    }) : null}

                </tbody>
            </table>)
        }
        if (view == "cards") {
            return data.map((i, index) => {
                return (
                    <div key={i.id} className="col-sm-5 col-md-4 mb-3">
                        <div className="card">
                            <div className="card-header" >
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0 card-title">{i.name}</p>
                                    <span>{index + 1}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-sm text-center mb-0">
                                    <thead>
                                        <tr>
                                            {i.stores.map((item, index) => {
                                                return <th key={index}>{item.name}</th>;
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {i.stores.map((item, index) => {
                                                return <td key={index}>{item.amount}</td>;
                                            })}
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="d-flex mt-2 justify-content-center px-5  py-1">
                                    <button
                                        className="btn btn-danger mr-2"
                                        onClick={() => {
                                            const root = createRoot(document.querySelector('#modal'));
                                            root.render(
                                                <div>
                                                    <Modal
                                                        message="Are you Sure Delete Card"
                                                        action={
                                                            <>
                                                                <button
                                                                    className="col-2 btn btn-danger btn-sm mr-2"
                                                                    onClick={() => {
                                                                        dispatch(DeleteCard(i.id));
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
                                    <button className="btn btn-info  w-50" onClick={() => {
                                        navigate(`/cards/edit/${i.id}`)
                                    }}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className='row justify-content-center my-3'>
            {renderView(data, view)}
        </div>
    )
}

export default ViewCards