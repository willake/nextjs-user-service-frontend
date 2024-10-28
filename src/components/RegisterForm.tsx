import { useState } from 'react'

interface RegisterFormProps {
    onSubmit: (username: string, email: string, password: string) => void
    error?: string | null
    loading?: boolean
}

const RegisterForm: React.FC<RegisterFormProps> = ({
    onSubmit,
    loading,
    error,
}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(username, email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
            {error && (
                <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}

            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your username"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    )
}

export default RegisterForm
