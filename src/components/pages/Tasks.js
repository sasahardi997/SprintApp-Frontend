import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeState, getSprints, getStates, getTasks, removeTask } from '../../store/task-actions';
import CreateTask from './CreateTask';

const Tasks = (props) => {

    let [taskName, setTaskName] = useState("");
    let [sprintId, setSprintId] = useState(-1);
    let [searchForm, setSearchForm] = useState(false);
    let [cartIsShown, setCartIsShown] = useState(false);

    const dispatch = useDispatch();

    const tasks = useSelector(state => state.task.tasks);
    const sprints = useSelector(state => state.task.sprints);
    const pageNo = useSelector(state => state.task.pageNo);
    const totalPages = useSelector(state => state.task.totalPages);
    const sprintSum = useSelector(state => state.task.sprintSum);

    useEffect(() => {
        dispatch(getTasks(0, "", -1));
        dispatch(getSprints());
        dispatch(getStates());
    }, [dispatch]);

    const nextState = (id) => {
        dispatch(changeState(id));
    }

    const deleteTask = (id) => {
        dispatch(removeTask(id));
    }

    const getNewTasks = (newPageNo) => {
        dispatch(getTasks(newPageNo));
    }

    let onSprintChange = (e) => {
        dispatch(getTasks(0, taskName, e.target.value));
        setSprintId(e.target.value);
    }

    let onTaskChange = (e) => {
        dispatch(getTasks(0, e.target.value, sprintId));
        setTaskName(e.target.value);
    }

    const buttonCreate = () =>{
        if(window.localStorage['role'] === 'ROLE_ADMIN'){
            return <Button style={{float: 'left'}} variant="success" onClick={() => showCartHandler()}>Create Task</Button>
        }
    }

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const sprintSumCheck = () => {
        if(sprintSum !== '0'){
            return true;
        }
    }

    const renderForm = () => {
        return(

            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Task name</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                name="taskName"
                                onChange={(e) => onTaskChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sprint</Form.Label>
                            <Form.Control
                                as="select"
                                name="sprintId"
                                onChange={(e) => onSprintChange(e)}>
                                    <option value={-1}>All</option>
                                    {sprints.map((s) => {
                                        return(
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        )
                                    })}

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        )
    }

    const renderTable = () => {
        return tasks.map((task) => {
            return(
                <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.indepted}</td>
                    <td>{task.points}</td>
                    <td>{task.stateName}</td>
                    <td>{task.sprintName}</td>
                    <td colSpan="2">{renderButtons(task)}</td>
                </tr>
            )
        })
    }

    const renderButtons = (task) => {
        if(window.localStorage['role'] === 'ROLE_ADMIN'){
            return(
                <div>
                    <Button variant="warning" style={{marginRight: '5px'}} onClick={() => props.history.push(`/tasks/${task.id}`)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
                </div>
            ) 
        } else if(window.localStorage['role'] === 'ROLE_USER'){
            if(task.stateId !== 3){
                return <Button variant="primary" onClick={() => nextState(task.id)} >Move on next State</Button>
            }
        }
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', paddingBottom: "50px"}}>Tasks</h1>

            {cartIsShown && <CreateTask onClose={hideCartHandler}/>}

            <Form.Group>
                <Form.Check type="checkbox" label="Show Search Form" onClick={() => setSearchForm(!searchForm)} />
            </Form.Group>

            {searchForm && renderForm()}

            <div style={{textAlign: 'right', marginTop: '20px'}}>
                {buttonCreate()}
                <Button disabled={pageNo === 0} onClick={() => getNewTasks(pageNo - 1)} variant="primary">Prev</Button>
                <Button disabled={pageNo === totalPages - 1} onClick={() => getNewTasks(pageNo + 1)} variant="primary">Next</Button>
            </div>

            <Table striped style={{marginTop: '5px'}}>
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Indepted</th>
                        <th>Points</th>
                        <th>State</th>
                        <th>Sprint</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
                </tbody>
            </Table>

            {sprintSumCheck() && <h4>Sprint Sum: {sprintSum}</h4>}
        </div>
    );
}

export default Tasks;