import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
    name: "",
    email: "",
    isLoading: true,
    isError: false,
    error: "",
};

// CreateUser Thunk:---
export const createUser = createAsyncThunk("usersSlice/createUser", async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName: name,
    });

    return {
        email: data.user.email,
        name: data.user.displayName,
    };
});

// LoginUser Thunk:---
export const loginUser = createAsyncThunk("usersSlice/loginUser", async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    //     .then((userCredential) => {
    //         const user = userCredential.user;
    //         // ...
    //         console.log('userLogin-line32', user);
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log('errorCode', errorCode);
    //         console.log('errorMessage', errorMessage);
    //     });
    // console.log('data userSlice - 40', data)

    return {
        email: data.user.email,
        name: data.user.displayName,
    };
});

// Google SignIn Thunk:---
export const signInWithGoogle = createAsyncThunk(
    "usersSlice/signInWithGoogle",
    async () => {
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, provider);

        console.log(data);
        return {
            email: data.user.email,
            name: data.user.displayName,
        };
    }
);

// UserSlice:---
const usersSlice = createSlice({
    name: 'usersSlice',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
        },
        toggleLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        logout: (state) => {
            state.name = '';
            state.email = '';
        },
    },

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
            .addCase(createUser.fulfilled, (state, { payload }) => {
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
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.email = '';
                state.name = '';
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = '';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action.error.message;
            })
            .addCase(signInWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.email = '';
                state.name = '';
                state.error = '';
            })
            .addCase(signInWithGoogle.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isError = false;
                state.email = payload.email;
                state.name = payload.name;
                state.error = '';
            })
            .addCase(signInWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.email = '';
                state.name = '';
                state.error = action.error.message;
            })
    },
});

export const { setUser, toggleLoading, logout } = usersSlice.actions;
export default usersSlice.reducer;