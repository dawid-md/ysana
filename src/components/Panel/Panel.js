import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

export default function Panel(){
    const { isAuthenticated } = useContext(AuthContext)

    return(
        <div className="left-panel d-flex">
            <nav className="nav flex-column mt-4">
            <Link to={"/"}>
                <span className="nav-link">Home</span>
            </Link>
            <Link to={"/"}>
                <span className="nav-link">Settings</span>
            </Link>
            {!isAuthenticated ? 
            <div>
                <Link to={"/login"}>
                    <span className="nav-link">Login</span>
                </Link>
                <Link to={"/register"}>
                    <span className="nav-link">Register</span>
                </Link>
            </div> : null
            }

            </nav>
        </div>
    )
}