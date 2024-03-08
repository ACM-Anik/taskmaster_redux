import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
    name: '',
    email: '',
    isLoading: true,
    isError: false,
    error: '',
};

export const createUser = createAsyncThunk("usersSlice/createUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    console.log(data);

    return ;
})

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        /* There are two type of code structure:
        builder.addCase();
        builder.addCase();
        builder.addCase();
        or chaining,
        builder.addCase().addCase().addCase();
        */
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.email = '';
                state.name = '';
                state.error = '';
            })
            .addCase(createUser.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = '';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action.error.message;
            })
    },
});

export default usersSlice.reducer;