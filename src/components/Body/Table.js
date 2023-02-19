import { useState, Fragment, useEffect } from "react";

const formTemplate = {
    taskName: "",
    assignee: "",
    priority: "",
    status: "",
    project: "",
    id: ""
}

export default function Table({ project, tasks }){
    const [taskState, settaskState] = useState(formTemplate)

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

    return(
        <>
        <div>{project}</div>
        <form>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Task</th>
                <th scope="col">Assignee</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Project</th>
                <th scope="col">Action</th>
                </tr>
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
                                <button className="btn border-secondary btn-light btn-sm">Save</button>
                                <button type="button" onClick={() => settaskState(formTemplate)} className="mx-2 btn border-secondary btn-light btn-sm">Cancel</button>
                                <button type="button" className="btn btn-sm btn-danger">x</button>
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