import axios from "axios"
import { useState, useEffect } from "react";
import Table from "./Table";

const formTemplate = {
    taskName: "",
    assignee: "",
    priority: "",
    status: "",
    project: ""
}

const newProject = {
    projectName: "MMK"
}

export default function Body(){
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] =useState(true)
    const [addFormData, setAddFormData] = useState({formTemplate})

    async function getData(){
        const resProjects = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
        const resTasks = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')

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

    async function getProjectsData(){
        const res = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
        const projectsData = []
        for(const key in res.data){
            projectsData.push({...res.data[key], id: key})
        }
        setProjects(projectsData)
    }

    async function insertTaskData(){
        const res = await axios.post('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', addFormData)
        getData()
        document.getElementById("addTaskForm").reset()
        setAddFormData(formTemplate)
    }

    async function insertProjectData(){
        const res = await axios.post('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json', newProject)
    }

    async function removeTask(taskID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskID}.json`)
        getData()
    }

    useEffect(() => {
        getData()
    }, [])

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
            <div className="text-center">

                {projects.map(pro => 
                    <Table key={pro.id} project={pro.projectName} tasks={tasks.filter(task => task.project === pro.projectName)} removeTask={removeTask} />
                )}

                <form id="addTaskForm">
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
                      name="priority"
                      required="required"
                      placeholder="priority"
                      onChange={handleAddFormChange}
                    />
                    <input 
                      type="text"
                      name="status"
                      required="required"
                      placeholder="status"
                      onChange={handleAddFormChange}
                    />
                    <input 
                      type="text"
                      name="project"
                      required="required"
                      placeholder="project"
                      onChange={handleAddFormChange}
                    />
                    <select className="">
                        {projects.map(pro => 
                            <option key={pro.id} value={pro.id}>{pro.projectName}</option>
                        )}
                    </select>
                      {/* <select id="cars" name="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="fiat" selected>Fiat</option>
                            <option value="audi">Audi</option>
                        </select> */}
                </form>
                <button onClick={insertTaskData} className="btn btn-primary my-2">Submit</button>
                <button onClick={insertProjectData} className="btn btn-success my-2 mx-2">Add Project</button>
            </div>
    )
}
