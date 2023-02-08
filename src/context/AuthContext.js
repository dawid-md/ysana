import { createContext, useState } from "react";

const AuthContext = createContext({})

export function AuthProvider({ children }){
    const [isAuthenticated, setisAuthenticated] = useState(false)

    const setAuth = (authValue) => {
        setisAuthenticated(authValue)
    }

    return(
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, setAuth }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext

// import React from "react"

// const AuthContext = React.createContext({
//     isAuthenticated: false,
//     login: () => {},
//     logout: () => {}
// })

// export default AuthContext