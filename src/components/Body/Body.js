import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Table from "./Table";

const formTemplate = {
    taskName: "",
    assignee: "",
    duedate: "",
    priority: "",
    status: "",
    project: ""
}

export default function Body(){
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [addFormData, setAddFormData] = useState(formTemplate)
    const { isAuthenticated, currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    async function getData(){
        const resProjects = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${currentUser.token}`)
        const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`)

        const projectsData = []
        for(const key in resProjects.data){
            projectsData.push({...resProjects.data[key], id: key})
        }
        setProjects(projectsData)

        const tasksData = []
        for(const key in resTasks.data){
            tasksData.push({...resTasks.data[key], id: key})
        }
        setTasks(tasksData)
        setLoading(false)
    }

    async function insertTaskData(){
        const res = await axios.post(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`, addFormData)
        getData()
        document.getElementById("addTaskForm").reset()
        setAddFormData(formTemplate)
    }

    async function removeTask(taskID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskID}.json?auth=${currentUser.token}`)
        getData()
    }

    useEffect(() => {
        console.log(isAuthenticated)
        if(isAuthenticated && currentUser.token) {
            getData()
        }
        else if(isAuthenticated === false){
            navigate("/login")
        }
    }, [isAuthenticated, currentUser])

    function handleAddFormChange(event){
        event.preventDefault()

        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        const newFormData = { ...addFormData }
        newFormData[fieldName] = fieldValue

        setAddFormData(newFormData)
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

            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Task name</th>
                    <th scope="col">Assignee</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Status</th>
                    <th scope="col">Project</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
            </table>

                {projects.map(pro => 
                    <Table key={pro.id} project={pro.projectName} projects={projects} tasks={tasks.filter(task => task.project === pro.projectName)} removeTask={removeTask} getData={getData} />
                )}

                <div className="holder">

                <form id="addTaskForm" className="d-inline-block">
                    <input 
                      type="text"
                      name="taskName"
                      required="required"
                      placeholder="task name"
                      onChange={handleAddFormChange}
                    />
                    <input 
                      type="text"
                      name="assignee"
                      required="required"
                      placeholder="person assigned"
                      onChange={handleAddFormChange}
                    />
                    <input 
                      type="text"
                      name="duedate"
                      required="required"
                      placeholder="Due Date"
                      onChange={handleAddFormChange}
                    />
                    <select 
                      className=""
                      name="priority"
                      defaultValue={"Priority"}
                      onChange={handleAddFormChange}>
                        <option value="Priority" disabled hidden>Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <select 
                      className=""
                      name="status"
                      defaultValue="Status"
                      onChange={handleAddFormChange}>
                        <option value="Status" disabled hidden>Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Done">Done</option>
                    </select>
                    <select 
                      className=""
                      name="project"
                      defaultValue={0}
                      onChange={handleAddFormChange}>
                        <option value="0" disabled hidden>Project</option>
                        {projects.map(pro => 
                            <option 
                                key={pro.id} 
                                value={pro.projectName}>
                                    {pro.projectName}</option>
                        )}
                        <option key="1" value="1">Private</option>
                    </select>
                </form>
                <div className="testrow d-inline-block w-25"></div>
                <button onClick={insertTaskData} className="btn btn-primary btn-sm">Submit</button>
                {/* <button className="btn btn-secondary d-block mx-auto">xD</button> */}
                </div>
            </div>
    )
}
