import { useContext } from "react"
import { AuthContext } from "../../App"

export default function Header(){
    const { user } = useContext(AuthContext)

    return(
        <div className="header d-flex">
            <h3 className="userNameLabel">{user ? user.displayName : null}</h3>
        </div>
    )
}