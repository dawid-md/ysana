import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/AuthContext";
import axios from 'axios';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([])
  const [tasksByDate, settasksByDate] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, currentUser } = useContext(AuthContext)

  async function getData(){
    const resTasks = await axios.get(`https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json?auth=${currentUser.token}`)
    const tasksData = []
    const tasksByDateCounter = []
    for(const key in resTasks.data){
        tasksData.push({...resTasks.data[key], id: key})
        if(tasksByDateCounter[resTasks.data[key].duedate] == undefined){tasksByDateCounter[resTasks.data[key].duedate] = 0}
        tasksByDateCounter[resTasks.data[key].duedate] += 1
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
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1 and pad with a leading 0 if needed
    const day = String(d.getDate()).padStart(2, '0'); // Pad with a leading 0 if needed
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
  //console.log(xDate.substring(0,8) + 22);
  //console.log(tasksByDate['2023-03-17']);
  //console.log(tasksByDate[(xDate.substring(0,8) + 22)]);
  
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
                <td key={cellIndex}><span>{cell}</span><span className='text-right'>{tasksByDate[xDate.substring(0,8) + ("0" + cell).slice(-2)]}</span></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    : null
  );
};

export default Calendar;




// import { useState } from "react"


// export default function Calendar(){
//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
//     const daysInMonth = (date) => {
//       return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
//     };
  
//     const firstDayOfMonth = (date) => {
//       return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//     };
  
//     const handlePrevMonthClick = () => {
//       const newDate = new Date(selectedDate);
//       newDate.setMonth(newDate.getMonth() - 1);
//       setSelectedDate(newDate);
//     };
  
//     const handleNextMonthClick = () => {
//       const newDate = new Date(selectedDate);
//       newDate.setMonth(newDate.getMonth() + 1);
//       setSelectedDate(newDate);
//     };
  
//     const renderDaysOfWeek = () => {
//       return daysOfWeek.map((day) => {
//         return (
//           <div key={day} className="calendar__day-of-week">
//             {day}
//           </div>
//         );
//       });
//     };
  
//     const renderDaysOfMonth = () => {
//       const days = [];
//       const daysInCurrentMonth = daysInMonth(selectedDate);
//       const firstDay = firstDayOfMonth(selectedDate);
  
//       for (let i = 0; i < firstDay; i++) {
//         days.push(<div key={`blank-${i}`} className="calendar__day calendar__day--blank"></div>);
//       }
  
//       for (let i = 1; i <= daysInCurrentMonth; i++) {
//         const currentDate = new Date(selectedDate);
//         currentDate.setDate(i);
//         days.push(
//           <div key={i} className="calendar__day" onClick={() => setSelectedDate(currentDate)}>
//             {i}
//           </div>
//         );
//       }
  
//       return days;
//     };
  
//     return (
//       <div className="calendar">
//         <div className="calendar__header">
//           <button onClick={handlePrevMonthClick}>{'<'}</button>
//           <h2>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h2>
//           <button onClick={handleNextMonthClick}>{'>'}</button>
//         </div>
//         <div className="calendar__body">
//           {renderDaysOfWeek()}
//           {renderDaysOfMonth()}
//         </div>
//       </div>
//     );
// }