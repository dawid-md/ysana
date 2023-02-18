export default function EditableRow({ task }){
    return(
        <tr>
            <td>{task.taskName}</td>
            <td>{task.assignee}</td>
            <td>{task.priority}</td>
            <td>{task.status}</td>
            <td>{task.project}</td>
            <td><button className="btn btn-sm btn-light">edit</button></td>
        </tr>
    )
}