import { Link } from "react-router-dom"

export default function Panel(){
    return(
        <div className="left-panel d-flex">
            <nav className="nav flex-column mt-4">
            <Link to={"/"}>
                <span className="nav-link">Home</span>
            </Link>
            <Link to={"/login"}>
                <span className="nav-link">Login</span>
            </Link>
            <Link to={"/register"}>
                <span className="nav-link">Register</span>
            </Link>
            </nav>
        </div>
    )
}