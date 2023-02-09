import { createContext, useState } from "react";

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const setAuth = (authenticateValue = false, tokenData = null) => {
        console.log('authvalue received:', authenticateValue);

        if (authenticateValue) {
            console.log('Sign in');
            setisAuthenticated(true)
        }
        if (tokenData) {
            console.log('setting local storage', tokenData);
            window.localStorage.setItem('token-data', JSON.stringify(tokenData))
        }
        if (authenticateValue == false) {
            console.log('Sign out');
            setisAuthenticated(false)
            window.localStorage.removeItem('token-data')
        }
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext