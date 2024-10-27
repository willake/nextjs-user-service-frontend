'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import ProfileSection from '@/components/ProfileSection'
import SetPasswordSection from '@/components/SetPasswordSection'
import DeleteAccountModal from '@/components/DeleteAccountModal'
import { useRouter } from 'next/navigation'
import useUserEndpoints from '@/hooks/useUserEndpoints'

const ProfilePage = () => {
    const { userId, logout } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const { loading, error, deleteUser } = useUserEndpoints()

    const handleDeleteUser = async () => {
        if (userId) {
            const result = await deleteUser(userId)
            if (result) router.push('/')
        }
    }

    const handleLogout = () => {
        logout()
        alert('Logged out successfully')
        router.push('/')
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <ProfileSection />
            <SetPasswordSection />
            <div className="border p-4 rounded-md shadow-md mt-4">
                <h2 className="text-xl font-bold">Account Management</h2>
                <button
                    disabled={loading}
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-red-500 text-white rounded-md p-2"
                >
                    Delete Account
                </button>
            </div>
            <button
                onClick={handleLogout}
                className="mt-4 bg-gray-500 text-white rounded-md p-2"
            >
                Log Out
            </button>
            <DeleteAccountModal
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={handleDeleteUser}
            />
        </div>
    )
}

export default ProfilePage
