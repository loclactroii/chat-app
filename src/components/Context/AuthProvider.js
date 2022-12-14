import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase/config'
import { Spin } from "antd";

export const AuthContext = React.createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // Direct path
    const navigate = useNavigate()

    React.useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(result => {
            if(result) {
                const { displayName, photoURL, uid, email } = result
                setUser({ displayName, photoURL, uid, email })
                setIsLoading(false)
                navigate('/')
                return
            }

            setIsLoading(false)
            navigate('/login')
        })

        // Clean up func
        return () => {
            unsubcribe()
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={user}>
            {isLoading? <Spin /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;