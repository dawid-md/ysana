import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../App";
import Table from "./Table";
import "react-datepicker/dist/react-datepicker.css";    //datepicker
import Searchbar from "../Searchbar/Searchbar";
import { getDatabase, ref, get, push, remove, update, query, orderByChild, equalTo } from 'firebase/database'

const formTemplate = {
    taskName: "",
    assignee: "",
    duedate: "",
    priority: "",
    status: "",
    project: ""
}

let downloadedTasks;

export default function Home(){
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [taskState, settaskState] = useState(formTemplate)
    const [loading, setLoading] = useState(true)
    const [btnAddTask, setbtnAddTask] = useState(true)                       //disabled when item is created
    const [btnAddTaskDisabled, setbtnAddTaskDisabled] = useState(false)     //disabled when some item is edited
    const { user } = useContext(AuthContext)

    async function getData(){
        const resProjects = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${user.accessToken}`)
        const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${user.accessToken}`)

        const projectsData = []
        for(const key in resProjects.data){
            projectsData.push({...resProjects.data[key], id: key})
        }
        setProjects(projectsData.sort((a,b) => (a.projectName > b.projectName) ? 1 : ((b.projectName > a.projectName) ? -1 : 0)))

        const tasksData = []
        for(const key in resTasks.data){
            tasksData.push({...resTasks.data[key], id: key})
        }
        downloadedTasks = tasksData
        setTasks(tasksData)
        setLoading(false)
    }

    async function removeTask(taskID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskID}.json?auth=${user.accessToken}`)
        getData()
    }

    useEffect(() => {
        user && getData()
    }, [])

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
                {btnAddTask ? <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-plus"></i> Task</button> 
                            : <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light border-danger btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-minus"></i> Cancel</button> }
                {/* <button className="addTaskbtnX btn btn-light btn-sm"><i className="fa-solid fa-user"></i></button> */}
                <button className="addTaskbtnX btn btn-light btn-sm">Sort</button>
                <Searchbar onSearch={searchHandler}/>
            </div>

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

                {projects.map(proj => 
                    <Table key={proj.id} 
                        project={proj.projectName} 
                        projects={projects} 
                        tasks={tasks.filter(task => task.project === proj.projectName)} 
                        setTasks={setTasks} 
                        removeTask={removeTask} 
                        getData={getData} 
                        taskState={taskState} 
                        settaskState={settaskState} 
                        btnAddTask={btnAddTask} 
                        setbtnAddTask={setbtnAddTask} 
                        setbtnAddTaskDisabled={setbtnAddTaskDisabled} 
                    />
                )}

            </div>
    )
}