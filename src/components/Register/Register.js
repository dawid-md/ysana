import axios from "axios"
import { useState, useContext } from "react"
import { AuthContext } from "../../App"
import { auth } from "../../config/firebase"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export default function Register(){
    const { user } = useContext(AuthContext)
    const [userCredentials, setuserCredentials] = useState({
        name: {
            value: "",
            rules: ""
        },
        email: {
            value: "",
            rules: ['required']
        },
        password: {
            value: "",
            rules: ['required']
        }
    })

    const navigate = useNavigate()

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

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
            await updateProfile(userCredential.user, {
                displayName: userCredentials.name
            });
            console.log("User signed up and name set in profile");
            navigate('/')
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
        // try{
        //     const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
        //         {email: userCredentials.email,
        //         password: userCredentials.password,
        //         displayName: userCredentials.name,
        //         returnSecureToken: true
        //     })
        //     navigate("/login")
        // } catch (ex) {
        //     console.log(ex.response);
        // }
    }

    return(
        <div>
            <h2 className="text-center">Register</h2>
            <form>
            <div className="mb-3 col-3 mx-auto">
                <label className="form-label">Name</label>
                <input onChange={changeCredentials} name="name" type="text" className="form-control" />
            </div>
            <div className="mb-3 col-3 mx-auto">
                <label className="form-label">Email address</label>
                <input onChange={changeCredentials} name="email" type="email" className="form-control" />
            </div>
            <div className="mb-3 col-3 mx-auto">
                <label className="form-label">Password</label>
                <input onChange={changeCredentials} name="password" type="password" className="form-control"/>
            </div>
            <div className="text-center">
                <button onClick={submit} type="submit" className="btn btn-primary btn-lg mx-22">Submit</button>
            </div>
            </form>
        </div>
    )
}