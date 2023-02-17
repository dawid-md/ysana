import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Panel from './components/Panel/Panel'
import './App.css'
import { useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import MyTasks from './components/MyTasks/MyTasks'
import Projects from './components/Projects/Projects'

function App() {
  const { isAuthenticated, setAuth, setUser } = useContext(AuthContext)

  const checkUser = () => {
    const tokenData = window.localStorage.getItem('token-data')
    if(tokenData){
      //console.log(JSON.parse(tokenData));
      setAuth(true)
      setUser(tokenData)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App d-flex">
        <BrowserRouter>
            <Panel />
            <div className="page-content">
              <Header />
              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/mytasks" element={<MyTasks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </div>
        </BrowserRouter>
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