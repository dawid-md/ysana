import axios from "axios";
import { useState, Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../App";
import emailjs from '@emailjs/browser'

const formTemplate = {
    taskName: "",
    assignee: "",
    duedate: "",
    priority: "",
    status: "",
    project: "",
    id: ""
}

export default function Table({ project, projects, tasks, removeTask, getData, taskState, settaskState, btnAddTask, setbtnAddTask, setbtnAddTaskDisabled }){
    const { user } = useContext(AuthContext)
    const [displayProject, setdisplayProject] = useState("d-block")

    // useEffect(() => {
    //     if(btnAddTask == false){setdisplayProject("d-block")}
    //     console.log('mounted');
    // })

    const sendEmail = (e) => {
        const emaildata = {
            service_id: 'service_wv2dldw',
            template_id: 'template_xj9zoi9',
            user_id: 'jRXuQMsXrIVi3ValX',
            template_params: {
                'subject': 'New Task Assigned',
                'username': taskState.assignee,
                'taskName': taskState.taskName,
                'priority': taskState.priority,
                'dueDate': taskState.duedate,
                'mailTo': 'capablanca09@gmail.com',
                // 'g-recaptcha-response': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
            }
        };
        
        axios.post('https://api.emailjs.com/api/v1.0/email/send', emaildata, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(function () {
          console.log('Your mail is sent!')
        })
        .catch(function (error) {
          console.log('Oops... ' + JSON.stringify(error))
        })
    }

    async function insertTaskData(event){
        // let keys = Object.keys(taskState)
        // let newTask = taskState
        //delete newTask[keys[keys.length - 1]]
        const res = await axios.post(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${user.accessToken}`, taskState)
        sendEmail()
        settaskState(formTemplate)
        getData()
    }

    function handleEditTaskForm(event){
        event.preventDefault()
        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value
        const newTaskData = { ...taskState }
        newTaskData[fieldName] = fieldValue
        settaskState(newTaskData)
    }

    function clickEdit(event, task){
        settaskState(task)
        //sendEmail()
    }

    async function updateTask(taskState){
        const res = await axios.patch(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskState.id}.json?auth=${user.accessToken}`, taskState)
        settaskState(formTemplate)
        getData()
    }

    function changeProjectVisibility(){
        displayProject === 'd-block' ? setdisplayProject('d-none') : setdisplayProject('d-block')
    }

    return(
        tasks.length > 0 ?
            <>
            {btnAddTask == false && project == "" ? null :  //hide project name holder when adding new task
                <div className="projectNameRow">
                    <button className="btn btn-light btn-sm d-inline-block mx-1" onClick={changeProjectVisibility}><span>{displayProject == "d-none" ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-up"></i>}</span></button>
                    <p className="fw-bold mx-1 d-inline-block">{project}</p>
                </div>
            }
            <form id={project} className={displayProject}>
            <table className="table">
                <thead>
                </thead>
                <tbody>
                    { 
                    tasks.map(task => 
                        <Fragment key={task.id}> 
                            {(taskState.id === task.id || task.id == "new") ? 
                                <tr>
                                <td>
                                    <input className="editableCell" type="text" required="required" value={taskState.taskName} name="taskName" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input className="editableCell" type="text" value={taskState.assignee} name="assignee" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <input className="editableCell" type="date" style={{minHeight:"26px"}} value={taskState.duedate} name="duedate" onChange={handleEditTaskForm} />
                                </td>
                                <td>
                                    <select 
                                        className="editableCell"
                                        name="priority"
                                        defaultValue={taskState.priority}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.priority} disabled hidden>{taskState.priority}</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Urgent">Urgent</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        className="editableCell"
                                        name="status"
                                        defaultValue={taskState.status}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.status} disabled hidden>{taskState.status}</option>
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Done">Done</option>
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        className="editableCell"
                                        name="project"
                                        defaultValue={taskState.project}
                                        onChange={handleEditTaskForm}>
                                            <option value={taskState.project} disabled hidden>{taskState.project}</option>
                                            {projects.map(pro => 
                                                <option 
                                                    key={pro.id} 
                                                    value={pro.projectName}>
                                                        {pro.projectName}</option>
                                            )}
                                            {/* <option key="1" value="1">Private</option> */}
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={     //confirm adding or deleting task
                                            taskState.id ? () => {updateTask(taskState); setbtnAddTaskDisabled(false)}          //update task confirm
                                            : () => {insertTaskData(); setbtnAddTask(true); setbtnAddTaskDisabled(false)}      //insert new task confirm
                                        } className="btn btn-light btn-sm"><span><i className="fa-solid fa-check"></i></span></button>

                                    {btnAddTask == true ?
                                    <>
                                        <button type="button" onClick={
                                                task.id == undefined ? () => {removeTask(task.id); settaskState(formTemplate); setbtnAddTaskDisabled(false)}
                                                : () => {settaskState(formTemplate); setbtnAddTaskDisabled(false)}
                                            } className="mx-2 btn btn-light btn-sm"><span><i className="fa-solid fa-ban"></i></span></button>
                                        <button type="button" onClick={() => {removeTask(task.id); setbtnAddTaskDisabled(false)}} className="btn btn-sm btn-light"><span><i className="fa-solid fa-trash"></i></span></button>
                                    </>
                                    : null
                                    }
                                </td>
                                </tr>
                            :
                                <tr>
                                    <td><img src="checkmark.png" width="20" height="20"></img>{task.taskName}</td>
                                    <td><span>{task.assignee}</span></td>
                                    <td><span>{task.duedate}</span></td>
                                    <td><span className={task.priority}>{task.priority}</span></td>
                                    <td><span className={(task.status).replace(/ /g, '_')}>{task.status}</span></td>
                                    <td><span>{task.project}</span></td>
                                    <td><button type="button" onClick={(event) => {clickEdit(event, task); setbtnAddTaskDisabled(true);}} className={`btn btn-light btn-sm ${btnAddTask ? "" : " disabled"}`}><span><i className="fa-solid fa-pen-to-square"></i></span></button></td>
                                </tr>
                            }
                        </Fragment>
                    )
                    }
                </tbody>
            </table>
            </form>
            </>
        :  null
    )
}