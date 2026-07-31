import React from 'react';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
    return (
        <ul className="border border-gray-300 rounded p-4">
            {tasks.map(task => (
                <li key={task.id} className="flex justify-between items-center py-2">
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
                    <div>
                        <button className="text-red-500 ml-4" onClick={() => deleteTask(task.id)}>Delete</button>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;