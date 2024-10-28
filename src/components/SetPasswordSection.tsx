import { useAuth } from '@/context/AuthContext'
import useUserEndpoints from '@/hooks/useUserEndpoints'
import { useState } from 'react'

const SetPasswordSection = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const { userId } = useAuth()
    const { loading, error, updateUserPassword } = useUserEndpoints()

    const handleSetUserPassword = async (e: React.FormEvent) => {
        if (userId) {
            const result = await updateUserPassword(
                userId,
                oldPassword,
                newPassword
            )
            if (result) alert('Update password successfully')
            else alert('Update password failed')
        }
    }

    return (
        <div className="border p-4 rounded-md shadow-md mt-4 text-gray-600">
            <h2 className="text-xl font-bold">Change Password</h2>
            <div className="mt-4">
                <label className="block mb-1">Old Password:</label>
                <input
                    disabled={loading}
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <div className="mt-4">
                <label className="block mb-1">New Password:</label>
                <input
                    disabled={loading}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
                <button
                    disabled={loading}
                    onClick={handleSetUserPassword}
                    className="mt-2 bg-blue-500 text-white rounded-md p-2"
                >
                    Set New Password
                </button>
            </div>
        </div>
    )
}

export default SetPasswordSection
