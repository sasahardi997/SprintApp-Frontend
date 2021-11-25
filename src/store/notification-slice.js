import {createSlice} from '@reduxjs/toolkit';


const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: null,
        notificationIsVisible: false
    },
    reducers:{
        showNotification(state, action){
            state.notification = {
                status: action.payload.status, 
                title: action.payload.title, 
                message: action.payload.message
            };
            state.notificationIsVisible = true;
        },
        hideNotification(state, action){
            state.notificationIsVisible = false;
        }
    }
})

export const notificationActions = notificationSlice.actions;

export default notificationSlice;