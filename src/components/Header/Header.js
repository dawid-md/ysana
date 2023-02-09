import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

export default function Header(){
    const { isAuthenticated, setAuth } = useContext(AuthContext)

    return(
        <>
            {isAuthenticated ? <button onClick={() => setAuth(false)} className="btn btn-warning my-2">Sign Out</button>
            : <button onClick={() => setAuth(true)} className="btn btn-warning my-2">Sign In</button>}
            <div className="header d-flex">
                <h2>Tasks</h2>
            </div>
            <div>
            </div>
        </>
    )
}

// {isAuthenticated ? <button className="btn btn-warning my-2">Sign Out</button>
// : <button className="btn btn-warning my-2">Sign In</button>}