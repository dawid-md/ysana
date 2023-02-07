import axios from "axios"
import { useState } from "react"

export default function Register(){

    const [userCredentials, setuserCredentials] = useState({
        email: {
            value: "",
            rules: ['required']
        },
        password: {
            value: "",
            rules: ['required']
        }
    })

    const changeCredentials = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute("name")
        const fieldValue = event.target.value

        const newUserData = { ...userCredentials }
        newUserData[fieldName] = fieldValue

        setuserCredentials(newUserData)
    }

    const submit = async (e) =>{
        e.preventDefault()

        const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
            {email: userCredentials.email,
            password: userCredentials.password,
            returnSecureToken: true
        })
        console.log(res.data);
    }

    return(
        <form>
        <div className="mb-3 col-3">
            <label className="form-label">Email address</label>
            <input onChange={changeCredentials} name="email" type="email" className="form-control" />
        </div>
        <div className="mb-3 col-3">
            <label className="form-label">Password</label>
            <input onChange={changeCredentials} name="password" type="password" className="form-control"/>
        </div>
        <button onClick={submit} type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}