import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "../Api/employee";
import _ from "lodash";

const initialState = {
  data: {},
  loading: false,
  errorMessage: "",
  dataSearch: {},
  isSearch: false,
  dataAfterFilter: {}
}
export const AddEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (payload, extra) => {
    const cardStores = Object.values(extra.getState().Cards.data).find(i => i.name == payload.data.card).stores.map(i => {
      return {
        name: i.name,
        amount: i.amount * payload.data.work
      }
    })
    const res = await employeeApi.post("", { ...payload.data, stores: cardStores });
    return res.data;
  }
);
export const FetchEmployees = createAsyncThunk(
  "employees/FetchEmployees",
  async () => {
    const res = await employeeApi.get("");
    return res.data;
  }
);
export const FetchEmployee = createAsyncThunk(
  "employees/FetchEmployee",
  async (id) => {
    const res = await employeeApi.get(`/${id}`);
    return res.data;
  }
);
export const DeleteEmployee = createAsyncThunk(
  "employees/DeleteEmployee",
  async (id) => {
    const res = await employeeApi.delete(`/${id}`);
    return id;
  }
);
export const EditEmployee = createAsyncThunk(
  "employees/EditEmployee",
  async (payload, extra) => {
    const cardStores = Object.values(extra.getState().Cards.data).find(i => i.name == payload.data.card).stores.map(i => {
      return {
        name: i.name,
        amount: i.amount * payload.data.work
      }
    })
    const res = await employeeApi.put(
      `/${payload.id}`,
      { ...payload.data, stores: cardStores },
      payload.id
    );
    return res.data;
  }
);

export const EmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    search: (state, { payload }) => {
      if (Object.values(payload.data).length !== 0) {
        state.dataSearch = payload.data;
        state.isSearch = true
      }
      else {
        state.dataSearch = payload.data;
        if (Object.values(payload.data) == 0 && payload.searchText == 0) {
          state.isSearch = false
        }
        if (Object.values(payload.data) == 0 && payload.searchText != 0) {
          state.isSearch = true
        }
      }
    },
    Filters: (state, { payload }) => {
      state.dataAfterFilter = _.mapKeys(payload, "id")
    }
  },
  extraReducers: (builder) => {
    // AddEmployee
    builder.addCase(AddEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, [payload.id]: payload };
    });
    builder.addCase(AddEmployee.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "erorr";
    });
    // FetchEmployees
    builder.addCase(FetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchEmployees.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = _.mapKeys(payload, "id");
      state.dataAfterFilter = state.data
    });
    builder.addCase(FetchEmployees.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Error";
    });
    // FetchEmployee
    builder.addCase(FetchEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, [payload.id]: payload };
    });
    builder.addCase(FetchEmployee.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Error";
    });
    // DeleteEmployee
    builder.addCase(DeleteEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteEmployee.fulfilled, (state, { payload }) => {
      state.data = _.omit(state.data, payload);
      state.dataAfterFilter = _.omit(state.data, payload);
      state.dataSearch = _.omit(state.dataSearch, payload);
      state.loading = false;
    });
    builder.addCase(DeleteEmployee.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Error";
    });
    // EditEmployee
    builder.addCase(EditEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(EditEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, [payload.id]: payload };
    });
    builder.addCase(EditEmployee.rejected, (state) => {
      state.loading = false;
      state.errorMessage = "Error";
    });
  }
});

export const { search, Filters } = EmployeesSlice.actions;
export default EmployeesSlice.reducer;
