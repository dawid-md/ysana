import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/AuthContext";
import axios from 'axios';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [todayDate, settodayDate] = useState(new Date());
  const [tasks, setTasks] = useState([])
  const [tasksByDate, settasksByDate] = useState({})
  //const [tasksByDate, settasksByDate] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, currentUser } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setmodalContent] = useState([])

  async function getData(){
    const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`)
    const tasksData = []
    //const tasksByDateCounter = []
    const tasksByDateCounter = {}
    for(const key in resTasks.data){
        tasksData.push({...resTasks.data[key], id: key})
        // if(tasksByDateCounter[resTasks.data[key].duedate] == undefined){tasksByDateCounter[resTasks.data[key].duedate] = 0}
        // tasksByDateCounter[resTasks.data[key].duedate] += 1
        if(tasksByDateCounter[resTasks.data[key].duedate] == undefined){tasksByDateCounter[resTasks.data[key].duedate] = [0, []]}
        tasksByDateCounter[resTasks.data[key].duedate][0] += 1
        tasksByDateCounter[resTasks.data[key].duedate][1].push(resTasks.data[key])
    }
    //console.log(tasksByDateCounter);
    setTasks(tasksData)
    settasksByDate(tasksByDateCounter)
    setLoading(false)
  }

  useEffect(() => {
    if(isAuthenticated && currentUser.token) {
        getData()
    }
    else if(isAuthenticated === false){
        //navigate("/login")
    }
    
}, [isAuthenticated, currentUser])

  const getCurrentDateFormatted = () => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); //Months are 0-based, so we add 1 and pad with a leading 0 if needed
    const day = String(d.getDate()).padStart(2, '0');       //Pad with a leading 0 if needed
    return `${year}-${month}-${day}`;
  }

  const generateMatrix = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    const firstDay = new Date(year, month, 0).getDay();           //day of week with mon as the first one
    const daysInMonth = new Date(year, month + 1, 0).getDate();   //last day of current month
  
    const matrix = [];
    let counter = 1;
  
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
          matrix[row][col] = null;
        } else if (counter > daysInMonth && col === 0) {
          matrix.splice(row)
          break
        } else if (counter > daysInMonth) {
          matrix[row][col] = null;
        } else {
          matrix[row][col] = counter;
          counter++;
        }
      }
    }
    //console.log(matrix);
    return matrix;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let xDate = getCurrentDateFormatted()
  
  return (
    !loading ? 
    <div>
      <h2>
        <button className='btn btn-light border-secondary mx-3 my-3' onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>Prev</button>
        {monthNames[date.getMonth()]} {date.getFullYear()}
        <button className='btn btn-light border-secondary mx-3 my-3' onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>Next</button>
      </h2>
      <table className="calendar">
        <thead>
          <tr>
            {dayNames.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateMatrix().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={(((date.getMonth()) == (todayDate.getMonth()) && 
                (cell == todayDate.getDate())) ? 'todayCard fw-bold bg-light' : 'notToday')} >
                  <span>{cell}</span>
                  {tasksByDate.hasOwnProperty(xDate.substring(0,8) + ("0" + cell).slice(-2)) ?
                    <span className="tasksAmount" 
                          onMouseEnter={() => {
                            setShowModal(true)
                            setmodalContent(tasksByDate[xDate.substring(0,8) + ("0" + cell).slice(-2)][1])
                          }}
                          onMouseLeave={() => {setShowModal(false)}}>      
                          {tasksByDate[xDate.substring(0,8) + ("0" + cell).slice(-2)][0]}
                    </span>
                  : null
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className='modalWin'>
          {modalContent.map((task, index) => <p key={task.id+"s"}>{task.assignee} | {task.taskName} | {task.priority} | {task.status}</p>)}
        </div>
      )}
    </div>
    : null
  );
};

export default Calendar;