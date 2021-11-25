import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SprintAxios from '../../apis/SprintAxios';
import { editTask } from '../../store/task-actions';

function EditTask(props) {

    const [task, setTask] = useState({
        id: -1,
        name: "",
        indepted: "",
        points: "",
        stateId: -1,
        sprintId: -1
    });

    const sprints = useSelector(state => state.task.sprints);
    const states = useSelector(state => state.task.states);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        let id = params.id;
        SprintAxios.get(`http://localhost:8080/api/tasks/${id}`)
            .then(res => {
                let task = res.data;
                setTask({
                    id: task.id,
                    name: task.name,
                    indepted: task.indepted,
                    points: task.points,
                    stateId: task.stateId,
                    sprintId: task.sprintId
                })
            }).catch(error => {
                console.log(error);
            })
            
    },[params.id]);

    const onInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let newTask = {...task};
        newTask[name] = value;
        setTask(newTask);
    }

    const changeTask = () => {
        dispatch(editTask(task));
    }

    return (
        <div>
            
            <h1 style={{textAlign: "center"}}>Edit Task - {task.name}</h1>

            <Row>
                <Col md={8}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Task name</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                value={task.name}
                                name="name"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Indepted</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                value={task.indepted}
                                name="indepted"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                as="input"
                                type="text"
                                name="points"
                                value={task.points}
                                placeholder="0-20"
                                onChange={(e) => onInputChange(e)}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sprint</Form.Label>
                            <Form.Control
                                as="select"
                                name="sprintId"
                                value={task.sprintId}
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
                                value={task.stateId}
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
                    <Button style={{marginTop: '20px'}} variant="primary" onClick={() => changeTask()}>Edit Task</Button>
                </Col>
            </Row>
            
           

            </div>
    );
}

export default EditTask;