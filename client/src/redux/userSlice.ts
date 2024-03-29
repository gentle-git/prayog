import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        logged: Boolean(sessionStorage.getItem('jwt')),
        type: '',
        details: {
            id: '',
            name: '',
            college: '',
            degree: '',
            projects: 0
        }
    },
    reducers: {
        login: (state,actions) => {
            state.logged = true;
            const {details} = actions.payload
            state.type = details.type;
            state.details.id = details.id;
            state.details.name = details.name;
            state.details.college = details.college;
            state.details.degree = details.degree;
            state.details.projects = details.projects;
        },
        logout: (state) => {
            sessionStorage.clear();
            state.logged = false;
        }
    }
})

export const { login } = userSlice.actions;
export const { logout } = userSlice.actions;
export default userSlice.reducer;