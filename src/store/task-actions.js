import SprintAxios from "../apis/SprintAxios"
import { taskActions } from "./task-slice"


export const getTasks = (newPageNo, taskName, sprintId) => {

    let config = {
        params: {
            pageNo: newPageNo
        }
    }

    if(taskName !== ""){
        config.params['name'] = taskName;
    }
     // eslint-disable-next-line
    if(sprintId != -1){
        config.params['sprintId'] = sprintId;
    }

    return (dispatch) => {
        SprintAxios.get("http://localhost:8080/api/tasks", config)
            .then(res => {
                dispatch(taskActions.replaceTasks({
                    tasks: res.data,
                    pageNo: newPageNo,
                    totalPages: res.headers['total-pages'],
                    sprintSum: res.headers['sprint-sum']
                }))
            }).catch(error => {
                console.log(error)
                alert("Error fetching tasks...")
            })
    }
}

export const getSprints = () => {
    return (dispatch) => {
        SprintAxios.get("http://localhost:8080/api/sprints")
            .then(res => {
                dispatch(taskActions.replaceSprints({
                    sprints: res.data
                }))
            }).catch(error => {
                console.log(error)
                alert("Error fetching sprints...")
            })
    }
}

export const getStates = () => {
    return (dispatch) => {
        SprintAxios.get("http://localhost:8080/api/states")
            .then(res => {
                dispatch(taskActions.replaceStates({
                    states: res.data
                }))
            }).catch(error => {
                console.log(error)
                alert("Error fetching sprints...")
            })
    }
}

export const removeTask = (id) => {
    return (dispatch) => {
        SprintAxios.delete(`http://localhost:8080/api/tasks/${id}`)
            .then(res => {
                dispatch(taskActions.removeTask({id : id}))
            }).catch(error => {
                console.log(error)
                alert("Error deleting task...")
            })
    }
}

export const createTask = (task) => {
    return (dispatch) => {
        SprintAxios.post("http://localhost:8080/api/tasks", task)
            .then(res => {
                taskActions.createTask(res.data);
            }).catch(error => {
                console.log(error)
            })
    }
}

export const editTask = (task) => {
    return (dispatch) => {
        SprintAxios.put(`http://localhost:8080/api/tasks/${task.id}`, task)
            .then(res => {
            }).catch(error => {
                console.log(error)
            })
    }
}

export const changeState = (id) =>{
    return (dispatch) => {
        SprintAxios.put(`http://localhost:8080/api/tasks/change-state/${id}`)
        .then(res => {
            dispatch(getTasks(0, "", -1));
        }).catch(error => {
            console.log(error)
        })

    }
}