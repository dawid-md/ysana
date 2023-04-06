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

export default function Table({ project, projects, tasks, removeTask, getData, taskState, settaskState, btnAddTask, setbtnAddTask }){
    const { currentUser } = useContext(AuthContext)
    //const [taskState, settaskState] = useState(formTemplate)
    const [displayProject, setdisplayProject] = useState("d-block")

    async function insertTaskData(event){
        let keys = Object.keys(taskState)
        let newTask = taskState
        delete newTask[keys[keys.length - 1]]
        console.log(newTask);
        const res = await axios.post(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`, taskState)
        settaskState(formTemplate)
        getData()
    }

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
                <button className="btn btn-light btn-sm d-inline-block" onClick={changeProjectVisibility}><span><i className="fa-solid fa-chevron-down"></i></span></button>
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
                            {(taskState.id === task.id || task.id == "new") ? 
                            <>
                                <tr>
                                <td>
                                    <input className="editableCell" type="text" required="required" value={taskState.taskName} name="taskName" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input className="editableCell" type="text" value={taskState.assignee} name="assignee" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input className="editableCell" type="date" value={taskState.duedate} name="duedate" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <select 
                                        className="editableCell"
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
                                        className="editableCell"
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
                                        className="editableCell"
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
                                            {/* <option key="1" value="1">Private</option> */}
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={
                                            taskState.id ? () => updateTask(taskState)
                                            : () => insertTaskData()
                                        } className="btn btn-light btn-sm"><span><i className="fa-solid fa-check"></i></span></button>

                                    {btnAddTask == true ?
                                    <><button type="button" onClick={
                                            task.id == undefined ? () => {removeTask(task.id); settaskState(formTemplate)}
                                            : () => {settaskState(formTemplate)}
                                        } className="mx-2 btn btn-light btn-sm"><span><i className="fa-solid fa-ban"></i></span></button>
                                    <button type="button" onClick={() => removeTask(task.id)} className="btn btn-sm btn-light"><span><i className="fa-solid fa-trash"></i></span></button>
                                    </>
                                    : null
                                    }
                                </td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td><img src="checkmark.png" width="20" height="20"></img>{task.taskName}</td>
                                    <td><span>{task.assignee}</span></td>
                                    <td><span>{task.duedate}</span></td>
                                    <td><span className={task.priority}>{task.priority}</span></td>
                                    <td><span className={(task.status).replace(/ /g, '_')}>{task.status}</span></td>
                                    <td><span>{task.project}</span></td>
                                    <td><button type="button" onClick={(event) => clickEdit(event, task)} className="btn btn-light btn-sm"><span><i className="fa-solid fa-pen-to-square"></i></span></button></td>
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