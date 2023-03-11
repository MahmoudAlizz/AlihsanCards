import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FetchCards, AddCard, search } from '../../Reducers/CardsSlice'
import View from './ViewCards'
import Search from '../Search'
import Spinner from '../Spinner';
const Cards = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchCards())
    }, []);
    const cards = Object.values(useSelector(i => i.Cards.data))
    const [view, setView] = useState("table");
    const navigate = useNavigate()
    const loading = useSelector(i => i.Cards.loading)
    const errorMessage = useSelector(i => i.Cards.errorMessage)
    const searchData = Object.values(useSelector(s => s.Cards.dataSearch))
    const isDataSearch = useSelector(s => s.Cards.isSearch)
    const renderView = (loading, employeeData, errorMessage, searchData, isDataSearch) => {
        if (isDataSearch == true) {
            if (Object.values(searchData).length != 0) {
                return <View view={view} data={searchData} />;
            }
            return <div className=" mt-4">
                <p className="py-1 text-center text-danger">No Cards have this name</p>
                <button className="btn btn-secondary d-block mx-auto" onClick={() => {
                    document.querySelector("#search").value = ""
                    document.querySelector("#searchbtn").click();
                }}>Show All Cards <i className="fa fa-arrow-alt-circle-down"></i></button>
            </div>
        }
        if (errorMessage) return <div className="text-danger">{errorMessage}</div>;
        if (loading) return <Spinner />;
        if (employeeData.length > 0)
            return <View view={view} data={employeeData} />;
        else return <div className="text-center text-danger font-weight-bold">No Cards</div>;
    };

    return (
        <div className='container'>
            <Search placeHolder="Search Cards" data={cards} dis={(e) => {
                dispatch(search(e))
            }} filterBy='name' />
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
                        navigate("/cards/create");
                    }}
                    className="col-md-5 col-sm-4 w-75 btn btn-outline-primary my-2 btn-sm"
                >
                    Add Card
                </button>
            </div>
            <hr />
            {renderView(loading, cards, errorMessage, searchData, isDataSearch)}
        </div>
    )
}

export default Cards