import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        setTask('');
    };

    return (
        <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task"
                className="border p-2 w-full rounded"
                required
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-2 w-full">Save</button>
        </form>
    );
};

export default AddTask;