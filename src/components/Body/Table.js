import axios from "axios";
import { useState, Fragment, useEffect } from "react";

const formTemplate = {
    taskName: "",
    assignee: "",
    priority: "",
    status: "",
    project: "",
    id: ""
}

export default function Table({ project, tasks, removeTask, getData }){
    const [taskState, settaskState] = useState(formTemplate)
    const [displayProject, setdisplayProject] = useState("d-block")

    function handleEditTaskForm(event){
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newTaskData = { ...taskState }
        newTaskData[fieldName] = fieldValue
        settaskState(newTaskData)
    }

    function clickEdit(event, task){
        event.preventDefault()
        settaskState(task)
    }

    async function updateTask(taskState){
        const res = await axios.patch(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskState.id}.json`, taskState)
        console.log(res);
        settaskState(formTemplate)
        getData()
    }

    function changeProjectVisibility(){
        displayProject === 'd-block' ? setdisplayProject('d-none') : setdisplayProject('d-block')
    }

    return(
        tasks.length > 0 ?
            <>
            <div className="projectNameRow">
                <button className="btn btn-light btn-sm d-inline-block" onClick={changeProjectVisibility}>v</button>
                <p className="fw-bold mx-1 d-inline-block">{project}</p>
            </div>
            <form id={project} className={displayProject}>
            <table className="table">
                <thead>
                </thead>
                <tbody>
                    { 
                    tasks.map(task => 
                        <Fragment key={task.id}>

                            {taskState.id === task.id ? 
                            <>
                                <tr>
                                <td>
                                    <input type="text" required="required" value={taskState.taskName} name="taskName" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" required="required" value={taskState.assignee} name="assignee" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" required="required" value={taskState.priority} name="priority" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" required="required" value={taskState.status} name="status" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" required="required" value={taskState.project} name="project" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <button type="button" onClick={() => updateTask(taskState)} className="btn border-secondary btn-light btn-sm">Save</button>
                                    <button type="button" onClick={() => settaskState(formTemplate)} className="mx-2 btn border-secondary btn-light btn-sm">Cancel</button>
                                    <button type="button" onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button>
                                </td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td>{task.taskName}</td>
                                    <td>{task.assignee}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.status}</td>
                                    <td>{task.project}</td>
                                    <td><button type="button" onClick={(event) => clickEdit(event, task)} className="btn btn-light border-secondary btn-sm">edit</button></td>
                                </tr>
                            </>

                            }

                        </Fragment>
                    )
                    }
                </tbody>
            </table>
            </form>
            </>
        :  null
    )
}



{/* <td><button onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button></td> */}
////<ReadOnlyRow changeTaskId={setEditTaskId} task={task} />
//<EditableRow task={task} changeTaskId={setEditTaskId} /> 
{/* <button type="button" onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button> */}
    // useEffect(() => {
    //     settaskState(task)
    // }, [])
    //const [editTaskId, setEditTaskId] = useState(null)