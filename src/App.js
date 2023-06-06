import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Panel from './components/Panel/Panel'
import './App.css'
import { useEffect, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthContext from './context/AuthContext'
import MyTasks from './components/MyTasks/MyTasks'
import Projects from './components/Projects/Projects'
import Calendar from './components/Calendar/Calendar'
import Inbox from './components/Inbox/Inbox'
import Settings from './components/Settings/Settings'
import MyTeam from './components/MyTeam/MyTeam'

function App() {
  const { setAuth, setUser } = useContext(AuthContext)
  //const [isAuth, setisAuth] = useState(false)

  const checkUser = async () => {
    const tokenData = window.localStorage.getItem('token-data')
    if(tokenData){
      await setAuth(true)
      await setUser(JSON.parse(tokenData))
      //setisAuth(true)
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
                <Route path="/myteam" element={<MyTeam />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;