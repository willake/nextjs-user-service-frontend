'use client'

import RegisterForm from '@/components/RegisterForm'
import useUserEndpoints from '@/hooks/useUserEndpoints'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const RegisterPage: NextPage = () => {
    const router = useRouter()
    const { loading, error, registerUser } = useUserEndpoints()

    const handleRegister = async (
        username: string,
        email: string,
        password: string
    ) => {
        const user = await registerUser(email, username, password)
        if (user) {
            alert('Create account successfully')
            router.push('/')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Register
                </h2>
                <RegisterForm
                    onSubmit={handleRegister}
                    loading={loading}
                    error={error}
                />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-2 py-2 px-4 w-full bg-gray-100 hover:bg-gray-200 text-blue-600 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
