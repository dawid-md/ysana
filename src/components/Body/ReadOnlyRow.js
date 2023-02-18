export default function ReadOnlyRow({ task, changeTaskId }){
    return(
        <tr>
            <td>{task.taskName}</td>
            <td>{task.assignee}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.project}</td>
            <td><button type="button" onClick={() => changeTaskId(task.id)} className="btn btn-light border-secondary btn-sm">edit</button></td>
        </tr>
    )
}