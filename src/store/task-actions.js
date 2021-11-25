import SprintAxios from "../apis/SprintAxios"
import { notificationActions } from "./notification-slice";
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
        SprintAxios.get("tasks", config)
            .then(res => {
                dispatch(taskActions.replaceTasks({
                    tasks: res.data,
                    pageNo: newPageNo,
                    totalPages: res.headers['total-pages'],
                    sprintSum: res.headers['sprint-sum']
                }))
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching tasks failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const getSprints = () => {
    return (dispatch) => {
        SprintAxios.get("sprints")
            .then(res => {
                dispatch(taskActions.replaceSprints({
                    sprints: res.data
                }))
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching sprints failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const getStates = () => {
    return (dispatch) => {
        SprintAxios.get("states")
            .then(res => {
                dispatch(taskActions.replaceStates({
                    states: res.data
                }))
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching states failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const removeTask = (id) => {
    return (dispatch) => {
        SprintAxios.delete(`tasks/${id}`)
            .then(res => {
                dispatch(taskActions.removeTask({id : id}))
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Remove task failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const createTask = (task) => {
    return (dispatch) => {
        SprintAxios.post("tasks", task)
            .then(res => {
                taskActions.createTask(res.data);

                dispatch(notificationActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sending task data successfully!'
                  }))
                  setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Creating task failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const editTask = (task) => {
    return (dispatch) => {
        SprintAxios.put(`tasks/${task.id}`, task)
            .then(res => {
                dispatch(notificationActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Edit task successfully!'
                  }))
                  setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
                  window.location.replace("/tasks");
            }).catch(error => {
                dispatch(notificationActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Editing task failed!'
                }))
                setTimeout(() => {
                    dispatch(notificationActions.hideNotification());
                  }, 3000);
            })
    }
}

export const changeState = (id) =>{
    return (dispatch) => {
        SprintAxios.put(`tasks/change-state/${id}`)
        .then(res => {
            dispatch(getTasks(0, "", -1));
        }).catch(error => {
            dispatch(notificationActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Changing state failed!'
            }))
            setTimeout(() => {
                dispatch(notificationActions.hideNotification());
              }, 3000);
        })
    }
}