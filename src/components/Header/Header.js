import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import axios from "axios"

export default function Header(){
    const { isAuthenticated, setAuth, currentUser } = useContext(AuthContext)

    return(
        <>
            <div className="header d-flex">
                <h3 className="userNameLabel">{isAuthenticated ? currentUser.displayName : null}</h3>
            </div>
        </>
    )
}