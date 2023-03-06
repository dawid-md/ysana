import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Table from "../Body/Table"
import AuthContext from "../../context/AuthContext"

export default function MyTasks(){
    const { isAuthenticated, currentUser } = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    async function getData(){
        //console.log(currentUser);
        const resProjects = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${currentUser.token}`)
        const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`)

        const projectsData = []
        for(const key in resProjects.data){
            projectsData.push({...resProjects.data[key], id: key})
        }
        setProjects(projectsData)

        const tasksData = []
        for(const key in resTasks.data){
            resTasks.data[key].assignee === currentUser.displayName && tasksData.push({...resTasks.data[key], id: key})
        }
        setTasks(tasksData)
        setLoading(false)
    }

    async function removeTask(taskID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskID}.json?auth=${currentUser.token}`)
        getData()
    }

    useEffect(() => {
        if(currentUser.displayName === ''){currentUser.displayName = JSON.parse(window.localStorage.getItem('user-name'))}
        if(isAuthenticated && currentUser.token) {
            getData()
        }
    }, [isAuthenticated, currentUser.token])

    return(
        loading ? 
            <div className="d-flex justify-content-center my-1">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :
            <div className="main-div">

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Task name</th>
                    <th scope="col">Assignee</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    <th scope="col">Project</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
            </table>

                {projects.map(pro => 
                    <Table key={pro.id} project={pro.projectName} tasks={tasks.filter(task => task.project === pro.projectName)} removeTask={removeTask} getData={getData} />
                )}
            </div>
    )
}