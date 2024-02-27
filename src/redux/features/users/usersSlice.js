import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'ACM Anik',
    email: 'anikmojumder@gmail.com',
};

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {

    },
});

export default usersSlice.reducer;