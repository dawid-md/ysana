import { createContext, useState } from "react";

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [isAuthenticated, setisAuthenticated] = useState(false)

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

    return(
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext