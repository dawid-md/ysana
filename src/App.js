import { useState } from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';

import './App.css';

function App() {
  return (
    <div className="App container-fluid">
      <div className='row'>
        <div className='col-2 dashboardColumn'>
        </div>
        <div className='col-10'>
          <Header className="header"/>
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;






















// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }