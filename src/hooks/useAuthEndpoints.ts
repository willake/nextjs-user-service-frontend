import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/services/api'
import { AxiosError } from 'axios'
import { useAuth } from '@/context/AuthContext'

export default function useAuthEndpoints() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setUserId, setToken } = useAuth()

    const login = async (username: string, password: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/api/v1/auth/login', {
                username: username,
                password: password,
            })
            const { userId, accessToken } = response.data

            setUserId(userId)
            setToken(accessToken)

            return true
        } catch (err) {
            const error = err as AxiosError
            setError(error.message || 'Login failed')

            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        login,
    }
}
