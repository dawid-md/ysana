import Header from './components/Header/Header';
import Body from './components/Body/Body';

import './App.css';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App d-flex">
      <div className="left-panel d-flex">
        <nav className="nav flex-column mt-4">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
          <a className="nav-link" href="#">Settings</a>
          <a className="nav-link" href="#">Register</a>
        </nav>
      </div>
      <div className="main-content">
        <Header />
        <Body />
        <Register />
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