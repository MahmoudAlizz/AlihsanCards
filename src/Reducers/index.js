import { configureStore } from "@reduxjs/toolkit";
import EmployeesSlice from "./EmployeesSlice";
import CardsSlice from './CardsSlice';
import { reducer as FormReducer } from "redux-form";
export const store = configureStore({
    reducer: {
        Employees: EmployeesSlice,
        Cards: CardsSlice,
        form: FormReducer,
    }
})