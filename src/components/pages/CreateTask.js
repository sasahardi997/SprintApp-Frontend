import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Modal from '../UI/Modal';
import { createTask } from '../../store/task-actions';

function CreateTask(props) {

    const [task, setTask] = useState({
        name: "",
        indepted: "",
        points: "",
        stateId: -1,
        sprintId: -1
    });

    const sprints = useSelector(state => state.task.sprints);
    const states = useSelector(state => state.task.states);

    const dispatch = useDispatch();

    const onInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let newTask = {...task};
        newTask[name] = value;
        setTask(newTask);
    }

    const inputIsValid = () => {
        if(task.name === "" || task.indepted === "" || task.points === "" || task.stateId === -1 || task.sprintId === -1){
            alert("All fields must be filled!");
        } else if(task.points < 0 || task.points > 20){
            alert("Points must be number between 0 and 20!");
        }else {
            return true;
        }
    }

    const addTask = () => {
        if(inputIsValid()){        
            dispatch(createTask(task));
            props.onClose();
        }
    }

    return (
        <Modal onClose={props.onClose}>
            
            <h1 style={{textAlign: "center"}}>Create Task</h1>

            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Task name</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                name="name"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Indepted</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                name="indepted"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                as="input"
                                type="number"
                                name="points"
                                placeholder="0-20"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sprint</Form.Label>
                            <Form.Control
                                as="select"
                                name="sprintId"
                                onChange={(e) => onInputChange(e)}>
                                    <option value={-1}></option>
                                    {sprints.map((s) => {
                                        return(
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        )
                                    })}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                as="select"
                                name="stateId"
                                onChange={(e) => onInputChange(e)}>
                                    <option value={-1}></option>
                                    {states.map((s) => {
                                        return(
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        )
                                    })}

                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            
            <Button style={{float: 'right'}} variant="success" onClick={() => addTask()}>Create Task</Button>
            <Button style={{float: 'right', marginRight: '10px'}} variant="danger" onClick={props.onClose}>Close</Button>

        </Modal>
    );
}

export default CreateTask;