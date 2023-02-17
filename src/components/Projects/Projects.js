import axios from "axios"
import { useState, useEffect } from "react"

export default function Projects(){
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])

    const newProject = {
        projectName: ""
    }

    async function getProjectsData(){
        const res = await axios.get('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
        const projectsData = []
        for(const key in res.data){
            projectsData.push({...res.data[key], id: key})
        }
        setProjects(projectsData)
        setLoading(false)
    }

    function handleInputChange(event){
        event.preventDefault()
        const fieldValue = event.target.value
        newProject.projectName = fieldValue
    }

    async function insertProjectData(){
        const res = await axios.post('https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json', newProject)
        getProjectsData()
    }

    async function removeProject(projectID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects/${projectID}.json`)
        getProjectsData()
    }
    
    useEffect(() => {
        getProjectsData()
    }, [])

    return(
        loading ?
            <div className="d-flex justify-content-center my-1">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        :    
        <div> 
            {projects.map(project => 
                <div key={project.id}>
                    <div className="d-inline-block mx-2 my-2">{project.projectName}<button className="btn btn-danger btn-sm mx-2" onClick={() => removeProject(project.id)}>X</button></div>
                </div>)}


            <input type="text" onChange={handleInputChange} className="form-control w-25 mx-2 my-2"/>
            <button className="btn btn-primary mx-2 my-2" onClick={insertProjectData}>Add Project</button>
            
        </div> 

    )       
}