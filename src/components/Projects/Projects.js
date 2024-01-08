import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../App"

export default function Projects(){
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])

    const newProject = {
        projectName: ""
    }

    async function getProjectsData(){
        const res = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${user.accessToken}`)
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
        const res = await axios.post(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects.json?auth=${user.accessToken}`, newProject)
        getProjectsData()
    }

    async function removeProject(projectID){
        const res = await axios.delete(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/projects/${projectID}.json?auth=${user.accessToken}`)
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
        <>
        <h2 className="mx-2">All Projects</h2> 
        <div className="centeredItem"> 
            {projects.map(project => 
                <div key={project.id} className="d-flex align-items-center justify-content-center w-100">
                    <div className="projectHolder w-75">{project.projectName}</div>
                    <button className="btn btn-danger btn-sm removeProject" onClick={() => removeProject(project.id)}>Remove</button>
                </div>)}
            <input type="text" onChange={handleInputChange} className="form-control addProjectInput mx-auto my-3"/>
            <button className="btn btn-primary my-3 w-75 buttonAddProject" onClick={insertProjectData}>Add Project</button>
        </div> 
        </>
    )       
}