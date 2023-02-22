import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

export default function Panel(){
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    return(
        <div className="left-panel d-flex">
            <nav className="nav flex-column mt-5 panelLink">
            <Link to={"/"}>
            <div className="panelDiv">
                    <span className="nav-link">Home</span>
                </div>
            </Link>
            <Link to={"/mytasks"}>
                <div className="panelDiv">
                    <span className="nav-link">My Tasks</span>
                </div>
            </Link>
            <Link to={"/"}>
                <div className="panelDiv">
                    <span className="nav-link text-center">Inbox</span>
                </div>
            </Link>
            <Link to={"/"}>
            <div className="panelDiv">
                    <span className="nav-link">Settings</span>
                </div>
            </Link>
            <Link to={"/projects"}>
            <div className="panelDiv">
                    <span className="nav-link">Projects</span>
                </div>
            </Link>
            {!isAuthenticated ? 
            <>
                <Link to={"/login"}>
                <div className="panelDiv">
                    <span className="nav-link">Login</span>
                </div>
                </Link>
                <Link to={"/register"}>
                <div className="panelDiv">
                    <span className="nav-link">Register</span>
                </div>
                </Link>
            </>
             : <Link to={"/login"}>
                <div className="panelDiv">
                    <span className="nav-link" onClick={() => setAuth(false)}>Sign out</span>
                </div>
               </Link>
            }
            </nav>
        </div>
    )
}