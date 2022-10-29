import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user';

export const store = configureStore({
    reducer: {
        user: userReducer
    }
});