import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Panel from './components/Panel/Panel'
import './App.css'
import { useEffect, createContext, useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyTasks from './components/MyTasks/MyTasks'
import Projects from './components/Projects/Projects'
import Calendar from './components/Calendar/Calendar'
import Inbox from './components/Inbox/Inbox'
import Settings from './components/Settings/Settings'
import MyTeam from './components/MyTeam/MyTeam'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext({
  user: null,
  setUser: () => {}
})

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // const updateUserName = (updatedUserName) =>{  //it doesn't change the name in the firebase, it is just callback from settings.js component which does that
  //   setUser(updatedUserName)
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe();  //cleanup on unmount
  });

  const authValue = useMemo(() => ({user, setUser}), [user])
  return (
    <div className="App">
      <AuthContext.Provider value={ authValue }>
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
                {/* <Route path="/settings" element={<Settings />} /> */}
              </Routes>
            </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;