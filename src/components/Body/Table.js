import axios from "axios";
import { useState, Fragment, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const formTemplate = {
    taskName: "",
    assignee: "",
    duedate: "",
    priority: "",
    status: "",
    project: "",
    id: ""
}

export default function Table({ project, projects, tasks, removeTask, getData }){
    const { currentUser } = useContext(AuthContext)
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
        //event.preventDefault()
        settaskState(task)
    }

    async function updateTask(taskState){
        const res = await axios.patch(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskState.id}.json?auth=${currentUser.token}`, taskState)
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
                                    <input type="text" value={taskState.taskName} name="taskName" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" value={taskState.assignee} name="assignee" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input type="text" value={taskState.duedate} name="duedate" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <select 
                                        className=""
                                        name="priority"
                                        defaultValue={taskState.priority}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.priority} disabled hidden>{taskState.priority}</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        className=""
                                        name="status"
                                        defaultValue={taskState.status}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.status} disabled hidden>{taskState.status}</option>
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Done">Done</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        className=""
                                        name="project"
                                        defaultValue={taskState.project}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.project} disabled hidden>{taskState.project}</option>
                                            {projects.map(pro => 
                                                <option 
                                                    key={pro.id} 
                                                    value={pro.projectName}>
                                                        {pro.projectName}</option>
                                            )}
                                            <option key="1" value="1">Private</option>
                                    </select>
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
                                    <td><img src="checkmark.png" width="20" height="20"></img>{task.taskName}</td>
                                    <td>{task.assignee}</td>
                                    <td>{task.duedate}</td>
                                    <td><span className="priorityBackground">{task.priority}</span></td>
                                    <td><span className="statusBackground">{task.status}</span></td>
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