import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import TaskDeletedConfirmation from './components/TaskDeletedConfirmation';

function App() {
    const [tasks, setTasks] = useState([]);
    const [view, setView] = useState('taskList');
    const [message, setMessage] = useState('');
    const [deletedTaskId, setDeletedTaskId] = useState(null);

    const addTask = (task) => {
        setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
        setView('taskList');
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        setDeletedTaskId(id);
    };

    const confirmDeletion = () => {
        setDeletedTaskId(null);
        setView('taskList');
    };

    return (
        <div className="container mx-auto p-4">
            {view === 'taskList' && <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask} />}
            {view === 'addTask' && <AddTask addTask={addTask} />}
            {deletedTaskId && <TaskDeletedConfirmation confirmDeletion={confirmDeletion} />}
            <div className="fixed bottom-0 right-0 m-4">
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setView('addTask')}>Add Task</button>
            </div>
        </div>
    );
}

export default App;