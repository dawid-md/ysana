import ReadOnlyRow from "./ReadOnlyRow";

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
                    <ReadOnlyRow key={task.id} task={task} />
                )
                }
            </tbody>
        </table>
        </>
    )
}


{/* <td><button onClick={() => removeTask(task.id)} className="btn btn-sm btn-danger">x</button></td> */}