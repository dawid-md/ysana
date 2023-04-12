import React, { useState } from 'react';

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const generateMatrix = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    const firstDay = new Date(year, month, 1).getDay()-1;         //day of week with mon as the first one
    const daysInMonth = new Date(year, month + 1, 0).getDate();   //last day of current month

    console.log(daysInMonth);
  
    const matrix = [];
    let counter = 1;
  
    for (let row = 0; row < 6; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDay) {
          matrix[row][col] = null;
        } else if (counter > daysInMonth) {
          matrix[row][col] = null;
        } else {
          matrix[row][col] = counter;
          counter++;
        }
      }
    }
    console.log(matrix);
    return matrix;
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div>
      <h2>
        <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}>Prev</button>
        {monthNames[date.getMonth()]} {date.getFullYear()}
        <button onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}>Next</button>
      </h2>
      <table>
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
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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