import { createContext, useState } from "react";

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const setAuth = (authValue, tokenData = null) => {
        setisAuthenticated(authValue)
        console.log(tokenData);

        if (isAuthenticated && tokenData) {
            console.log(tokenData);
            window.localStorage.setItem('token-data', JSON.stringify(tokenData))
        }
        else {
            //window.localStorage.removeItem('token-data')
        }
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext