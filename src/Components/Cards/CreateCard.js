import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddCard } from '../../Reducers/CardsSlice'
import CardForm from './CardForm'
import Spinner from '../Spinner'
const CreateCard = () => {
    const dispatch = useDispatch();
    const loading = useSelector(i => i.Cards.loading)
    const errorMessage = useSelector(i => i.Cards.errorMessage)
    const renderView = (loading, errorMessage) => {
        if (loading) {
            return <Spinner />
        }
        if (errorMessage) {
            return <div className="text-center text-danger">{errorMessage}</div>
        }
        return <CardForm action={AddCard} />
    }
    return (
        <div>
            <div className="card-header">
                <div className="card-title mb-0 text-center">Add Card</div>
            </div>
            {renderView(loading, errorMessage)}
        </div>
    )
}

export default CreateCard   