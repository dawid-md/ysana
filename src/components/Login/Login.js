import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../App"
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
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

        try {
            const userCredential = await signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password);
            console.log("User logged in", userCredential);
            navigate('/'); //Redirect to home
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Login error", errorCode, errorMessage);
        }

        // try{
        //     const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
        //         {email: userCredentials.email,
        //         password: userCredentials.password,
        //         returnSecureToken: true
        //     })
        //     console.log('zalogowano: res.data', res.data);
        //     setAuth(true, {
        //         email: res.data.email,
        //         token: res.data.idToken,
        //         refreshToken: res.data.refreshToken,
        //         userID: res.data.localId,
        //     })
        //     setUser({
        //         email: res.data.email,
        //         token: res.data.idToken,
        //         refreshToken: res.data.refreshToken,
        //         userID: res.data.localId,
        //     })
        //     navigate('/')
        // } catch (ex) {
        //     console.log('sign in error ' + ex.response);
        // }
    }

    useEffect(() => {
        // setAuth(false)
    },)

    return(
        <div>
            <h2 className="text-center">Sign In</h2>
            <form>
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