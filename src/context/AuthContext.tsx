'use client'

import {
    ReactNode,
    useContext,
    useState,
    createContext,
    useEffect,
} from 'react'

interface IAuthContext {
    userId: string | null
    setUserId: (userId: string | null) => void
    token: string | null
    setToken: (token: string | null) => void
    isAuthenticated: boolean
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const isAuthenticated = Boolean(token)

    useEffect(() => {
        // Load user and token from localStorage when the component mounts
        // It is because initially it is server side
        const savedUserId = localStorage.getItem('auth-user')
        const savedToken = localStorage.getItem('jwt-token')

        if (savedUserId) {
            setUserId(savedUserId)
        }

        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        // Update localStorage whenever user or token changes
        if (userId) {
            localStorage.setItem('auth-user', userId)
        } else {
            localStorage.removeItem('auth-user')
        }

        if (token) {
            localStorage.setItem('jwt-token', token)
        } else {
            localStorage.removeItem('jwt-token')
        }
    }, [userId, token])

    return (
        <AuthContext.Provider
            value={{ userId, setUserId, token, setToken, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
