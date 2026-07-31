import React from 'react';

const TaskDeletedConfirmation = ({ confirmDeletion }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg p-6">
                    <h3 className="text-lg font-semibold">Task Deleted</h3>
                    <p className="mt-2">The task has been deleted successfully.</p>
                    <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={confirmDeletion}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDeletedConfirmation;