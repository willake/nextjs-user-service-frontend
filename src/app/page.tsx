'use client'

import LoginForm from '@/components/LoginForm'
import useAuthEndpoints from '@/hooks/useAuthEndpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const Home: NextPage = () => {
    const router = useRouter()
    const { loading, error, login } = useAuthEndpoints()

    const handleLogin = async (username: string, password: string) => {
        var success = await login(username, password)
        if (success) router.push('/profile')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-300">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login
                </h2>
                <LoginForm
                    onSubmit={handleLogin}
                    loading={loading}
                    error={error}
                />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                    </p>
                    <button
                        onClick={() => router.push('/register')}
                        className="mt-2 py-2 px-4 w-full bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
