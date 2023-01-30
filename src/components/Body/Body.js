import axios from "axios"
import { useState, useEffect } from "react";

export default function Body(props){
    const [tasks, setTasks] = useState([])

    async function getData(){
        const res = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
        const tasksData = []
        for(const key in res.data){
            tasksData.push({...res.data[key], id: key})
        }
        setTasks(tasksData)
    }

    useEffect(() => {
        getData()
    }, [])
    
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Task</th>
                    <th scope="col">Assignee</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => 
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.taskName}</td>
                                <td>{task.assignee}</td>
                                <td></td>
                            </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}

{/* <div className="dropdown">
<button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Done
</button>
<ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">In Progress</a></li>
    <li><a className="dropdown-item" href="#">On Hold</a></li>
    <li><a className="dropdown-item" href="#">Not Started</a></li>
</ul>
</div> */}