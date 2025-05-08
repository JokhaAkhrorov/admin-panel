// ./modals/DeleteConfirmModal.jsx
import React from 'react'

function DeleteConfirmModal({ onCancel, onDelete }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">Are you sure?</h2>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmModal
