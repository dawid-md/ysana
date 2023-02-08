import { useContext } from "react"
import AuthContext from "../../context/AuthContext"

export default function Header(props){
    const auth = useContext(AuthContext)

    return(
        <>
            {auth.isAuthenticated ? <span>Zalogowany</span>
            : <span>Niezalogowany</span>}
            <div className="header d-flex">
                <h2>Tasks</h2>
            </div>
            <div>
            </div>
        </>
    )
}