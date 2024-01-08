import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import axios from "axios"

export default function Settings(){
    const [userName, setuserName] = useState('')
    const { user } = useContext(AuthContext)

    useEffect(() => {
        setuserName(user.displayName)
    }, [])

    const changeData = (event) => {
        event.preventDefault()
        const newUserName = event.target.value
        setuserName(newUserName)
    }

    const submit = async (event) => {
        event.preventDefault()
        console.log('knur knur knur xD');

        const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
            {idToken: user.accessToken,
            displayName: userName})
    }

    return(
        <div>
            <h2 className="text-center">User Data</h2>
            <form>
            <div className="mb-3 col-3 mx-auto">
                <label className="form-label">Name</label>
                <input onChange={changeData} name="name" type="text" className="form-control" value={userName} />
            </div>
            <div className="text-center">
                <button onClick={submit} type="submit" className="btn btn-primary btn-lg mx-22">Save</button>
            </div>
            </form>
        </div>
    )
}