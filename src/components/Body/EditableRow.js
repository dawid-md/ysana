import { useState, useEffect } from "react"

const formTemplate = {
    taskName: "",
    assignee: "",
    priority: "",
    status: "",
    project: ""
}

export default function EditableRow({ task, changeTaskId }){
    const [taskState, settaskState] = useState(formTemplate)

    function handleEditTaskForm(event){
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newTaskData = { ...taskState }
        newTaskData[fieldName] = fieldValue
        settaskState(newTaskData)
    }

    useEffect(() => {
        settaskState(task)
    }, [])

    return(
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
                <button type="button" onClick={() => changeTaskId(null)} className="mx-2 btn border-secondary btn-light btn-sm">Cancel</button>
                {/* <button type="button" onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button> */}
                <button type="button" className="btn btn-sm btn-danger">x</button>
            </td>
        </tr>
    )
}