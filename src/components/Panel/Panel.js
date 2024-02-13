import { Link } from "react-router-dom"
import { useContext } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"
import { AuthContext } from "../../App"

export default function Panel(){
    const { user } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
            // navigate('/login'); 
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return(
        <div className="left-panel">
            <div className="left-panel-links">
                <Link to={"/"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-house"></i> Home</span>
                    </div>
                </Link>
                <Link to={"/inbox"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-envelope"></i> Inbox</span>
                    </div>
                </Link>
                <Link to={"/mytasks"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-list-check"></i> My Tasks</span>
                    </div>
                </Link>
                <Link to={"/myteam"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-list-check"></i> My Team</span>
                    </div>
                </Link>
                <Link to={"/calendar"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-calendar-days"></i> Calendar</span>
                    </div>
                </Link>
                {/* <Link to={"/settings"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-gears"></i> Settings</span>
                    </div>
                </Link> */}
                <Link to={"/projects"}>
                    <div className="panel-link">
                        <span><i className="fa-solid fa-diagram-project"></i> Projects</span>
                    </div>
                </Link>
                {!user ? 
                <>
                    <Link to={"/login"}>
                    <div className="panel-link">
                        <span>Login</span>
                    </div>
                    </Link>
                    <Link to={"/register"}>
                    <div className="panel-link">
                        <span>Register</span>
                    </div>
                    </Link>
                </>
                : <Link to={"/login"}>
                    <div className="panel-link">
                        <span onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out</span>
                    </div>
                </Link>
                }
            </div>
        </div>
    )
}