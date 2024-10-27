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

    const getUser = async (userId: string) => {
        setLoading(true)
        setError(null)

        try {
            var response = api.get(`/api/v1/user/${userId}`)
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    const updateUserInfo = async (userId: string, email: string) => {
        setLoading(true)
        setError(null)

        try {
            var response = api.put(`/api/v1/user`, {
                userId: userId,
                email: email,
            })
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
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
            api.put(`/api/v1/user/${userId}/password`, {
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    const deleteUser = async (userId: string) => {
        setLoading(true)
        setError(null)

        try {
            api.delete(`/api/v1/user/${userId}`)

            router.push('/')
        } catch (err: unknown) {
            const error = err as AxiosError
            setError(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }
}
