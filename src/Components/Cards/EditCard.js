import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditCard as Edit } from '../../Reducers/CardsSlice'
import CardForm from './CardForm'
import Spinner from '../Spinner'
import { useParams } from "react-router-dom";
import _ from "lodash";

const EditCard = () => {
    const dispatch = useDispatch();
    const loading = useSelector(i => i.Cards.loading)
    const errorMessage = useSelector(i => i.Cards.errorMessage)
    const id = useParams().id;
    const card = useSelector((s) => s.Cards.data[id]);
    const renderView = (loading, errorMessage, card, id) => {

        if (loading) {
            return <Spinner />
        }
        if (errorMessage) {
            return <div className="text-center text-danger">{errorMessage}</div>
        }
        return <CardForm action={Edit} id={id} initialValues={_.pick(
            card,
            "name"
        )} />
    }
    return (
        <div>
            <div className="card-header">
                <div className="card-title mb-0 text-center">Add Card</div>
            </div>
            {renderView(loading, errorMessage, card, id)}
        </div>
    )
}

export default EditCard   