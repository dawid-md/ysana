import { useState, Fragment } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

export default function Table({ project, tasks, removeTask }){
    const [editTaskId, setEditTaskId] = useState(null)

    return(
        <>
        <div>{project}</div>
        <form>
        <table className="table">
            <thead>
                <tr>
                {/* <th scope="col">ID</th> */}
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
                        {editTaskId === task.id ? <EditableRow changeTaskId={setEditTaskId} /> 
                                    : <ReadOnlyRow changeTaskId={setEditTaskId} task={task} />
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