import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Table from "../Body/Table"
import AuthContext from "../../context/AuthContext"
import Searchbar from "../Searchbar/Searchbar";

const formTemplate = {
    taskName: ",,,",
    assignee: "",
    duedate: "",
    priority: "",
    status: "",
    project: ""
}

let downloadedTasks;

export default function MyTasks(){
    const { isAuthenticated, currentUser } = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [taskState, settaskState] = useState(formTemplate)
    const [loading, setLoading] = useState(true)
    const [btnAddTask, setbtnAddTask] = useState(true)
    const [btnAddTaskDisabled, setbtnAddTaskDisabled] = useState(false)

    async function getData(){
        const resProjects = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${currentUser.token}`)
        const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`)

        const projectsData = []
        for(const key in resProjects.data){
            projectsData.push({...resProjects.data[key], id: key})
        }
        setProjects(projectsData.sort((a,b) => (a.projectName > b.projectName) ? 1 : ((b.projectName > a.projectName) ? -1 : 0)))

        const tasksData = []
        for(const key in resTasks.data){
            resTasks.data[key].assignee === currentUser.displayName && tasksData.push({...resTasks.data[key], id: key})
        }
        downloadedTasks = tasksData
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

    function addNewTaskForm(){          //show and hide new task form
        if(btnAddTask === true){
            let newtasks = [...tasks]
            setTasks(newtasks)
            newtasks.unshift({
                taskName: "",
                assignee: "",
                duedate: "",
                priority: "",
                status: "",
                project: "",
                id: "new"
            });
        }
        else{
            let newtasks = [...tasks]
            newtasks.shift()
            setTasks(newtasks)
        }
    }

    function searchHandler(searchterm){
        searchterm == "" ? setTasks(downloadedTasks) : setTasks(downloadedTasks.filter((item) => item.taskName.toLowerCase().includes(searchterm.toLowerCase())))
    }

    return(
        loading ? 
            <div className="d-flex justify-content-center my-1">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :
            <div className="main-div">
            <div className="filterPanel">
                {btnAddTask ? <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-plus"></i> Add Task</button> 
                            : <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light border-danger btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-minus"></i> Cancel</button> }
                {/* <button className="addTaskbtnX btn btn-light btn-sm"><i className="fa-solid fa-user"></i></button> */}
                {/* <button className="addTaskbtnX btn btn-light btn-sm">Sort</button> */}
                <Searchbar onSearch={searchHandler}/>
            </div>
                {/* <TopPanel tasks={tasks} setTasks={setTasks} addNewTaskForm={addNewTaskForm} onSearch={searchHandler} btnAddTask={btnAddTask} setbtnAddTask={setbtnAddTask} btnAddTaskDisabled={btnAddTaskDisabled} /> */}
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col"><span>Task name</span></th>
                        <th scope="col"><span>Assignee</span></th>
                        <th scope="col"><span>Due Date</span></th>
                        <th scope="col"><span>Priority</span></th>
                        <th scope="col"><span>Status</span></th>
                        <th scope="col"><span>Project</span></th>
                        <th scope="col"><span>Action</span></th>
                        </tr>
                    </thead>
                </table>
                {projects.map(pro => 
                    <Table key={pro.id} project={pro.projectName} projects={projects} tasks={tasks.filter(task => task.project === pro.projectName)} setTasks={setTasks} removeTask={removeTask} getData={getData} taskState={taskState} settaskState={settaskState} btnAddTask={btnAddTask} setbtnAddTask={setbtnAddTask} setbtnAddTaskDisabled={setbtnAddTaskDisabled} />
                )}
            </div>
    )
}