import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Register from './components/Register/Register';
import Panel from './components/Panel/Panel';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
//import AuthContext from './context/AuthContext';
import { useContext } from 'react';
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <div className="App d-flex">
      <AuthProvider>
      <BrowserRouter>
          <Panel />
          <div className="page-content">
            <Header />
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
      </BrowserRouter>
      </AuthProvider>
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