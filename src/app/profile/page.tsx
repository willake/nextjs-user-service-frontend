'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import ProfileSection from '@/components/ProfileSection'
import SetPasswordSection from '@/components/SetPasswordSection'
import DeleteAccountModal from '@/components/DeleteAccountModal'
import { useRouter } from 'next/navigation'
import useUserEndpoints from '@/hooks/useUserEndpoints'
import { NextPage } from 'next'

const ProfilePage: NextPage = () => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-300">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Profile Page
                </h1>

                <ProfileSection />

                <div className="mt-6">
                    <SetPasswordSection />
                </div>

                <div className="border-t border-b mt-6 pt-4 mb-6 pb-4">
                    <h2 className="text-lg font-semibold text-gray-600">
                        Account Management
                    </h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 w-full bg-red-500 text-white font-semibold rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                        Delete Account
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full bg-gray-500 text-white font-semibold rounded-md py-2 px-4 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    Log Out
                </button>

                <DeleteAccountModal
                    isOpen={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteUser}
                />
            </div>
        </div>
    )
}

export default ProfilePage
