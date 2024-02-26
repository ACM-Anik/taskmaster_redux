import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'ACM Anik',
    email: 'anikmojumder@gmail.com',
    userTasks:[],
};
const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {

    }
});

export default usersSlice.reducer;