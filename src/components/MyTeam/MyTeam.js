import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../App"

export default function MyTeam() {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(user);
        if(user == null){
            navigate("/login")
        }
    })

    return <div>My Team</div>  
}