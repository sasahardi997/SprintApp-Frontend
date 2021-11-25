import { createSlice } from "@reduxjs/toolkit";


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks:[],
        sprints: [],
        states: [],
        pageNo: 0,
        totalPages: 1,
        sprintSum: 0
    },
    reducers: {
        replaceTasks(state, action){
            state.tasks = action.payload.tasks;
            state.pageNo = action.payload.pageNo;
            state.sprintSum = action.payload.sprintSum;
            state.totalPages = action.payload.totalPages;
        },
        replaceSprints(state, action){
            state.sprints = action.payload.sprints;
        },
        replaceStates(state, action){
            state.states = action.payload.states;
        },
        removeTask(state, action){
            const id = action.payload.id;
            state.tasks = state.tasks.filter(x => {
                return x.id !== id;
            })
        },
        createTask(state, action){
            state.tasks = state.tasks.push(...state.tasks, action.payload);
        }
}});

export const taskActions = taskSlice.actions;

export default taskSlice;