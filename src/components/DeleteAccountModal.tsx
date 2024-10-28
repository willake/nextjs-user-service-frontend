import { useState } from 'react'

interface DeleteAccountModalProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
    isOpen,
    onCancel: onClose,
    onConfirm: onDelete,
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-600">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete your account?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 bg-gray-300 rounded-md p-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white rounded-md p-2"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal
