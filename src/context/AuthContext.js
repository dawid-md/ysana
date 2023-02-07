import React from "react"

const AuthContext = React.createContext({
    user: false,
    login: () => {},
    logout: () => {}
})

export default AuthContext