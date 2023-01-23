export default function Body(props){
    return(
        <div>
            <button className="btn btn-primary" onClick={props.chS}>State</button>
            <h1></h1>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Task name</th>
                    <th scope="col">Assignee</th>
                    <th scope="col">Due date</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>04/05/2023</td>
                    <td>

                    <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Done
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">In Progress</a></li>
                        <li><a className="dropdown-item" href="#">On Hold</a></li>
                        <li><a className="dropdown-item" href="#">Not Started</a></li>
                    </ul>
                    </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}