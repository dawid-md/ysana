import { useState } from 'react';

import Header from './components/Header/Header';
import Body from './components/Body/Body';

import './App.css';

function App() {
  const [state, setState] = useState(5)

  const changeState = () => {
    console.log('zmieniam state');
    setState(55)
  }

  return (
    <div className="App">
      <Header className="header"/>
      <div className="container">
        <Body chS={changeState} />
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