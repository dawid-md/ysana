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
        const resProjects = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
        const resTasks = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')

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
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskID}.json`)
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

    //getData()

    return(
        loading ? 
            <div className="d-flex justify-content-center my-1">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :
            <div className="text-center">

                {projects.map(pro => 
                    <Table key={pro.id} project={pro.projectName} tasks={tasks.filter(task => task.project === pro.projectName)} removeTask={removeTask} getData={getData} />
                )}
            </div>
    )
}