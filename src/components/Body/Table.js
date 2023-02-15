export default function Table({ project, tasks, removeTask }){
    return(
        <>
        <div>{project}</div>
        <table className="table">
            <thead>
                <tr>
                {/* <th scope="col">ID</th> */}
                <th scope="col">Task</th>
                <th scope="col">Assignee</th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col">Project</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { 
                tasks.map(task => 
                    <tr key={task.id}>
                        {/* <td>{task.id}</td> */}
                        <td>{task.taskName}</td>
                        <td>{task.assignee}</td>
                        <td>{task.priority}</td>
                        <td>{task.status}</td>
                        <td>{task.project}</td>
                        <td><button className="btn btn-sm btn-light">edit</button></td>
                        <td><button onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button></td>
                    </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}