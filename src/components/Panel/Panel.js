import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

export default function Panel(){
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    return(
        <div className="left-panel">
            <div className="mt-5">
            <Link to={"/"}>
                <div className="panelDiv">
                    <span>Home</span>
                </div>
            </Link>
            <Link to={"/mytasks"}>
                <div className="panelDiv">
                    <span>My Tasks</span>
                </div>
            </Link>
            <Link to={"/"}>
                <div className="panelDiv">
                    <span>Inbox</span>
                </div>
            </Link>
            <Link to={"/"}>
            <div className="panelDiv">
                    <span>Settings</span>
                </div>
            </Link>
            <Link to={"/projects"}>
            <div className="panelDiv">
                    <span>Projects</span>
                </div>
            </Link>
            {!isAuthenticated ? 
            <>
                <Link to={"/login"}>
                <div className="panelDiv">
                    <span>Login</span>
                </div>
                </Link>
                <Link to={"/register"}>
                <div className="panelDiv">
                    <span>Register</span>
                </div>
                </Link>
            </>
             : <Link to={"/login"}>
                <div className="panelDiv">
                    <span onClick={() => setAuth(false)}>Sign out</span>
                </div>
               </Link>
            }
            </div>
        </div>
    )
}