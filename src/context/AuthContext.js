import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        email: '',
        token: '',
        refreshToken: '',
        userID: '',
        displayName: ''
    })

    const getCurrentUserToken = () => {
        console.log('returning user token');
        return currentUser.token
    }

    const setAuth = (authenticateValue = false, tokenData = null) => {
        if (authenticateValue) {
            setisAuthenticated(true)
        }
        if (tokenData) {
            window.localStorage.setItem('token-data', JSON.stringify(tokenData))
        }
        if (authenticateValue == false) {
            setisAuthenticated(false)
            window.localStorage.removeItem('token-data')
        }
    }

    const setUser = async (tokenData = null) => {
        let userData = JSON.parse(tokenData)
        let userNameResponse = await getUserName(userData.token, userData.refreshToken, false)  //, ""
        if(userNameResponse[0] == 200){
            userData.displayName = userNameResponse[1]
            setCurrentUser({...userData})
            window.localStorage.setItem('user-name', JSON.stringify(userData.displayName))
        }
        else if (userNameResponse[0] == 400){
            let dataByRefreshedToken = await getUserName(userNameResponse[1], null, true)    // , "" try by new token
            userData.token = userNameResponse[1]
            userData.displayName = dataByRefreshedToken[1]
            setAuth(true, userData)
            setCurrentUser({...userData})
            window.localStorage.setItem('user-name', JSON.stringify(userData.displayName))
        }
        else{
            console.log('refresh token attempt failes');
            setisAuthenticated(false)
        }
    }

    const getUserName = async (token, refreshTokenID, lastCheck = false) => {   //, addtest = ""
        try {
            const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
                {idToken: token}) // + ""
                return [res.status, res.data.users[0].displayName]
        }
        catch (ex) {
            if((ex.response.data.error.message === "INVALID_ID_TOKEN") && lastCheck == false){
                let refreshTokenResponse = await refreshUserToken(refreshTokenID)
                console.log('new token', refreshTokenResponse);
                return [400, refreshTokenResponse]
            }
            else{return 'error'}
        }
    }

    const refreshUserToken = async (refreshTokenID) => {
        try {
            const res = await axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
                {grant_type: "refresh_token",
                 refresh_token: refreshTokenID})
            return res.data.id_token
        }
        catch (ex) {
            console.log("nieudana reautentykacja ", ex.response);
            return ['error']
        }
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, setAuth, currentUser, setUser, getCurrentUserToken }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext