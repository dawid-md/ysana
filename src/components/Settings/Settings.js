import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import { updateProfile } from "firebase/auth"
import { auth } from "../../config/firebase"

export default function Settings(){
    const [userName, setUserName] = useState('')
    const { user, updateUserName } = useContext(AuthContext)

    useEffect(() => {
        setUserName(user.displayName || '')
    }, [user.displayName])

    const changeData = (event) => {
        event.preventDefault()
        const newUserName = event.target.value
        setUserName(newUserName)
    }

    const submit = async (event) => {
        event.preventDefault()
        try{
            await updateProfile(auth.currentUser, {
                displayName: userName
            })
            console.log('profile updated');
            updateUserName({...auth.currentUser, displayName: userName})
        } catch (error) {
            console.log('error updating profile ', error);
        }
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