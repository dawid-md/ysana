import Searchbar from "../Searchbar/Searchbar";

export default function TopPanel({tasks, setTasks, addNewTaskForm, onSearch, btnAddTask, setbtnAddTask, btnAddTaskDisabled}){

    return (
    <div className="filterPanel">
        {btnAddTask ? <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-plus"></i> Add Task</button> 
                    : <button onClick={() => {addNewTaskForm(); setbtnAddTask(!btnAddTask)}} className={`addTaskbtn btn btn-light border-danger btn-sm ${btnAddTaskDisabled ? "disabled" : ""}`}><i className="fa-solid fa-minus"></i> Cancel</button> }
        <Searchbar onSearch={onSearch}/>
    </div>

    )
}