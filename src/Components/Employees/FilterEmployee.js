import React, { useState, useEffect } from 'react'
import Filters from '../Filters';
import { useSelector, useDispatch } from 'react-redux';
import { FetchCards } from '../../Reducers/CardsSlice';
import { Filters as actionDispatch } from '../../Reducers/EmployeesSlice';
const FilterEmployee = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FetchCards())
    }, []);
    const cardTypes = Object.values(useSelector(i => i.Cards.data)).map(i => (i.name))
    const data = Object.values(useSelector(i => i.Employees.data))
    const [gender, setGender] = useState('all');
    const [marred, setMarred] = useState('all');
    const [card, setCard] = useState('all');
    const [workHours, setWorkHours] = useState({ from: 10, to: 99999 })
    useEffect(() => {
        if (data.length > 0) {
            let f = Filters({ data: data, filtersBy: { gender: gender, card: card, marred: marred, work: workHours } })
            dispatch(actionDispatch(f))
        }
    }, [gender, card, marred, workHours]);
    return (
        <div>
            <form action="">
                <div id='accordion'>
                    <div className="card text-center">
                        <div className="card-header ">
                            <h5 className='font-weight-bold'>Filters</h5>
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-header ">
                            <a href="#col1" data-toggle="collapse" data-parent="#accordion">
                                <h5>Gender</h5>
                            </a>
                        </div>
                        <div className="collapse" id='col1'>
                            <div className="card-body">
                                <label htmlFor="a1" className='ml-1'>All</label>
                                <input type="radio" className='ml-1' name="gender" onClick={() => { setGender('all') }} id="a1" />
                                <label htmlFor="m" className='ml-1'>Male</label>
                                <input type="radio" className='ml-1' name="gender" onClick={() => { setGender('male') }} id="m" />
                                <label htmlFor="f" className='ml-1'>Female</label>
                                <input type="radio" className='ml-1' name="gender" onClick={() => { setGender('female') }} id="f" />
                            </div>
                        </div>
                    </div>
                    <div className="card text-center">
                        <div className="card-header ">
                            <a href="#col2" data-toggle="collapse" data-parent="#accordion">
                                <h5>Married</h5>
                            </a>
                        </div>
                        <div className="collapse" id='col2'>
                            <div className="card-body">
                                <label htmlFor="a2" className='ml-1'>All</label>
                                <input type="radio" className='ml-1' name="marred" onClick={() => { setMarred('all') }} id="a2" />
                                <label htmlFor="y" className='ml-1'>Yes</label>
                                <input type="radio" className='ml-1' name="marred" onClick={() => { setMarred('yes') }} id="y" />
                                <label htmlFor="n" className='ml-1'>No</label>
                                <input type="radio" className='ml-1' name="marred" onClick={() => { setMarred('no') }} id="n" />
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header text-center">
                            <a href="#col3" data-toggle="collapse" data-parent="#accordion">
                                <h5>Card</h5>
                            </a>
                        </div>
                        <div className="collapse" id='col3'>
                            <div className="card-body">
                                <select name="cards" id="" className='form-control' onClick={(e) => {
                                    setCard(e.target.value)
                                }}>
                                    <option value="all">All</option>
                                    {cardTypes.map((i, index) => {
                                        return (
                                            <option key={index} value={i}>{i}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header text-center">
                            <a href="#col4" data-toggle="collapse" data-parent="#accordion">
                                <h5>Work Hours</h5>
                            </a>
                        </div>
                        <div className="collapse" id='col4'>
                            <div className="card-body d-flex">
                                <input type="number" name="" id="" className='w-50 form-control' onChange={(e) => {
                                    let w = { ...workHours };
                                    w.from = Number(e.target.value)
                                    setWorkHours(w)
                                }} />
                                <span className='mx-1 py-1'>:</span>
                                <input type="number" name="" id="" className='w-50 form-control' onChange={(e) => {
                                    let w = { ...workHours };
                                    w.to = Number(e.target.value)
                                    setWorkHours(w)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline-success mx-auto d-block mt-2" type="reset" onClick={() => {
                    setGender('all');
                    setMarred('all');
                    setCard('all');
                    setWorkHours({ from: 0, to: 9999 });
                }}>Reset Default Filters <i className='fa fa-refresh'></i></button>
            </form>
        </div>
    )
}

export default FilterEmployee