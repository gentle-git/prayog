import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './themeSlice';
import userReducer from './userSlice';
const store =  configureStore({
    reducer:{
        theme:themeReducer,
        user:userReducer
    }

})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
