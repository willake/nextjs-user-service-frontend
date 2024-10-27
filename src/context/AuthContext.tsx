import {
    ReactNode,
    useContext,
    useState,
    createContext,
    useEffect,
} from 'react'

export interface User {
    id: string
    email: string
    username: string
}

interface IAuthContext {
    user: User | null
    setUser: (user: User | null) => void
    token: string | null
    setToken: (token: string | null) => void
    isAuthenticated: boolean
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('auth-user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('jwt-token')
    )

    const isAuthenticated = Boolean(token)

    useEffect(() => {
        // Update localStorage whenever user or token changes
        if (user) {
            localStorage.setItem('auth-user', JSON.stringify(user))
        } else {
            localStorage.removeItem('auth-user')
        }

        if (token) {
            localStorage.setItem('jwt-token', token)
        } else {
            localStorage.removeItem('jwt-token')
        }
    }, [user, token])

    return (
        <AuthContext.Provider
            value={{ user, setUser, token, setToken, isAuthenticated }}
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
