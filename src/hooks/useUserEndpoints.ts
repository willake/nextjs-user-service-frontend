import { useAuth } from '@/context/AuthContext'
import User from '@/models/User'
import api from '@/services/api'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function useUserEndpoints() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const registerUser = async (
        email: string,
        username: string,
        password: string
    ) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/api/v1/user', {
                email: email,
                username: username,
                password: password,
            })

            // Redirect to login after successful registration
            router.push('/')
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async (userId: string) => {
        setLoading(true)
        setError(null)

        try {
            var response = await api.get(`/api/v1/user/${userId}`)
            const data: User = response.data
            return data
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
            return null
        } finally {
            setLoading(false)
        }
    }

    const updateUserInfo = async (userId: string, email: string) => {
        setLoading(true)
        setError(null)

        try {
            var response = await api.put(`/api/v1/user`, {
                id: userId,
                email: email,
            })
            const data: User = response.data
            return data
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
            return null
        } finally {
            setLoading(false)
        }
    }

    const setUserPassword = async (
        userId: string,
        oldPassword: string,
        newPassword: string
    ) => {
        setLoading(true)
        setError(null)

        try {
            await api.put(`/api/v1/user/${userId}/password`, {
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            return true
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
            return false
        } finally {
            setLoading(false)
        }
    }

    const deleteUser = async (userId: string) => {
        setLoading(true)
        setError(null)

        try {
            await api.delete(`/api/v1/user/${userId}`)
            return true
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
            return false
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        error,
        registerUser,
        fetchUser,
        updateUserInfo,
        setUserPassword,
        deleteUser,
    }
}
