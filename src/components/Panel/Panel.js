import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthContext"

export default function Panel(){
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    const checkUser = () => {
        const tokenData = (window.localStorage.getItem('token-data'))
        if(tokenData){
          //console.log(tokenData);
          setAuth(true)
        }
      }
    
      useEffect(() => {
        checkUser()
      }, [])

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