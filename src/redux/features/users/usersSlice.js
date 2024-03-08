import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
    name: 'ACM Anik',
    email: 'anikmojumder@gmail.com',
    isLoading: true,
    isError: false,
    error: '',
};

export const createUser = createAsyncThunk("usersSlice/createUser", async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    console.log(data);

    return;
})

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {

    },
});

export default usersSlice.reducer;