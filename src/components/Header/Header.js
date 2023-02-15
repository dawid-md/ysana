import { useContext } from "react"
import AuthContext from "../../context/AuthContext"
import axios from "axios"

export default function Header(){
    const { isAuthenticated, setAuth, currentUser } = useContext(AuthContext)

    return(
        <>
            <div className="header d-flex">
                <h2>Tasks</h2>
                {isAuthenticated ? <button onClick={() => setAuth(false)} className="btn btn-light btn-sm">Sign Out</button>
                    : <button onClick={() => setAuth(true)} className="btn btn-light btn-sm">Sign In</button>}
                <h2>{isAuthenticated ? currentUser.displayName : null}</h2>
            </div>
            <div>
                lele
            </div>
        </>
    )
}













            {/* <button onClick={getUser} className="btn btn-success">getUser</button> */}
            {/* <button onClick={changeUser} className="btn btn-warning">changeUser</button>
            <button onClick={refreshT} className="btn btn-danger">refreshT</button> */}





// const changeUser = async () => {

//     try {
//         const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
//         {idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20veXNhbmEtZDc5ZjQiLCJhdWQiOiJ5c2FuYS1kNzlmNCIsImF1dGhfdGltZSI6MTY3NTk4MzA0NiwidXNlcl9pZCI6IjM5TzhXTm90alBhMzBadmtOMDF4eTF6anAzSzMiLCJzdWIiOiIzOU84V05vdGpQYTMwWnZrTjAxeHkxempwM0szIiwiaWF0IjoxNjc1OTgzMDQ2LCJleHAiOjE2NzU5ODY2NDYsImVtYWlsIjoiZGF3aWRnQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJkYXdpZGdAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.dimWCanLo8Iqyd3TeZQU4ZcdU5V4KDkVJ8Qe96-7vKLgBouPSkPsS8Vg9lxFMAU9AiE7M2dU2_ErYpjGFrNfOVtoiDtV5hmR0OpIQ6teJvvoQurVMP5Ou6cfBN5DE6PRGJ3BxVIBhnFjrZL2muyatBskPu1SbUIh2x_p9IuATAGnjCN6ye0CJzezJl--srI610ounO5FBIb6MnFVIA08rJuw1OzGynTGhgGBLSdqStevWiHq6wpsB0wXX6-XR6uco6itkQ9MJ_NJEgjX0DzOVRwTidpnd5tXQNrLED0MZvaeVTgSgWPgRMtNK_PMdguauOI6MCMaC6kWvTPFO87Avg",
//          displayName: "DavosxD"})
//         console.log(res.data);
//         //console.log(res.data.users[0].email);
//         //document.getElementById('username').textContent = res.data.users[0].email
//     }
//     catch (ex) {
//         console.log(ex.response);
//     }
// }

// const refreshT = async () => {

//     try {
//         const res = await axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
//         {grant_type: "refresh_token",
//         refresh_token: "APJWN8dlPNypKku41B02WCX81y-mf580cZKBlJtqb3hH_l-H7aCeYGwUmPzL_myUvlvrsD7tjjl7Xd0aLD8mAlRG0bwhRe0zpGzcLbcoA7-7lQ7B0OdXy0ft1bcb1zT0v3TX0sUi5o5JuUBCXM_r3M-aCGtK8QmyqHmxakrmwqq5iu5eZx7Df5TICUrO1O5A9ej0WxcGcpk2"})
//         console.log(res.data);
//         //console.log(res.data.users[0].email);
//         //document.getElementById('username').textContent = res.data.users[0].email
//     }
//     catch (ex) {
//         console.log(ex.response);
//     }
// }

// {isAuthenticated ? <button className="btn btn-warning my-2">Sign Out</button>
// : <button className="btn btn-warning my-2">Sign In</button>}

// const getUser = async () => {

//     try {
//         const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
//          {idToken: currentUser.token})
//         console.log(res.data);
//         console.log(res.data.users[0].email);
//         //document.getElementById('username').textContent = res.data.users[0].email
//     }
//     catch (ex) {
//         console.log(ex.response);
//     }
// }