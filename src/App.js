import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Panel from './components/Panel/Panel'
import './App.css'
import { useEffect, createContext, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import AuthContext from './context/AuthContext'
// import { AuthProvider } from './context/AuthContext'
import MyTasks from './components/MyTasks/MyTasks'
import Projects from './components/Projects/Projects'
import Calendar from './components/Calendar/Calendar'
import Inbox from './components/Inbox/Inbox'
import Settings from './components/Settings/Settings'
import MyTeam from './components/MyTeam/MyTeam'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext()

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setLoading(false);
    });

    return () => unsubscribe();  //cleanup on unmount
  }, []);

  return (
    <div className="App d-flex">
      <AuthContext.Provider value={{ user, setUser }}>
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;