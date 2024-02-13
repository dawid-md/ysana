import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Panel from './components/Panel/Panel'
import './App.css'
import { useEffect, createContext, useState, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
  const [loading, setLoading] = useState(true);

  // const updateUserName = (updatedUserName) =>{  //it doesn't change the name in the firebase, it is just callback from settings.js component which does that
  //   setUser(updatedUserName)
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false);
    })
    return () => unsubscribe();  //cleanup on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;  //if checking user is still processing
  }

  //const authValue = useMemo(() => ({user, setUser}), [user])
  return (
    <div className="App">
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
            <Panel />
            <div className="page-content">
              <Header />
              <Routes>
                <Route path="/" element={!user? <Navigate to="/login" /> : <Home />} />
                <Route path="/mytasks" element={!user? <Navigate to="/login" /> : <MyTasks />} />
                <Route path="/myteam" element={!user? <Navigate to="/login" /> : <MyTeam />} />
                <Route path="/inbox" element={!user? <Navigate to="/login" /> : <Inbox />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/projects" element={!user? <Navigate to="/login" /> : <Projects />} />
                <Route path="/calendar" element={!user? <Navigate to="/login" /> : <Calendar />} />
                {/* <Route path="/settings" element={<Settings />} /> */}
              </Routes>
            </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;