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

export default function Body(){
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [addFormData, setAddFormData] = useState(formTemplate)

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

    async function insertTaskData(){
        const res = await axios.post('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', addFormData)
        getData()
        document.getElementById("addTaskForm").reset()
        setAddFormData(formTemplate)
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

    function handleSelect(event){
        event.preventDefault()

        const field = event.target.value
        console.log(field);
    }

    function test(){
        console.log("test passed");
    }

    return(
        loading ? 
            <div className="d-flex justify-content-center my-1">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :
            <div className="main-div text-center">

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
                    <select onChange={handleSelect}>
                        <option 
                            key="s1" 
                            value=""></option>
                        {projects.map(pro => 
                            <option 
                                key={pro.id} 
                                value={pro.projectName}>
                                    {pro.projectName}</option>
                        )}
                        <option key="1" value="1">Private</option>
                    </select>
                </form>
                <button onClick={insertTaskData} className="btn btn-primary my-2">Submit</button>
            </div>
    )
}
