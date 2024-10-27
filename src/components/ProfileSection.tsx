import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/services/api'
import useUserEndpoints from '@/hooks/useUserEndpoints'

const ProfileSection = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const { userId } = useAuth()
    const { loading, error, fetchUser, updateUserInfo } = useUserEndpoints()

    useEffect(() => {
        const loadUser = async () => {
            if (userId) {
                const user = await fetchUser(userId)
                if (user) {
                    setUsername(user.username)
                    setEmail(user.email)
                }
            }
        }

        loadUser()
    }, [])

    const updateEmail = async () => {
        if (userId) {
            const savedUser = await updateUserInfo(userId, email)
            if (savedUser) {
                alert('Update email successfully')
                setEmail(savedUser.email)
            }
        }
    }

    return (
        <div className="border p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Profile Information</h2>
            <p>
                <strong>User ID:</strong> {userId}
            </p>
            <p>
                <strong>Username:</strong> {username}
            </p>
            <div className="mt-4">
                <label className="block mb-1">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
                <button
                    onClick={updateEmail}
                    className="mt-2 bg-blue-500 text-white rounded-md p-2"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default ProfileSection
