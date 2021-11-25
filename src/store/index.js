import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notification-slice";
import taskSlice from "./task-slice";


const store = configureStore({
    reducer: {
        task: taskSlice.reducer,
        notification: notificationSlice.reducer
    }
});

export default store;