from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import asyncpg

app = FastAPI()

DATABASE_URL = os.environ['DATABASE_URL']

class Task(BaseModel):
    id: int
    text: str
    completed: bool = False

class TaskCreate(BaseModel):
    text: str

class TaskComplete(BaseModel):
    completed: bool

# PostgreSQL connection details
async def get_db_connection():
    return await asyncpg.connect(DATABASE_URL)

@app.post('/api/tasks', response_model=Task)
async def create_task(task: TaskCreate):
    conn = await get_db_connection()
    try:
        statement = 'INSERT INTO tasks(text, completed) VALUES ($1, $2) RETURNING id;'
        task_id = await conn.fetchval(statement, task.text, False)
        return Task(id=task_id, text=task.text, completed=False)
    finally:
        await conn.close()

@app.put('/api/tasks/{task_id}', response_model=Task)
async def update_task(task_id: int, task_update: TaskComplete):
    conn = await get_db_connection()
    try:
        statement = 'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING text;'
        text = await conn.fetchval(statement, task_update.completed, task_id)
        if text is None:
            raise HTTPException(status_code=404, detail="Task not found")
        return Task(id=task_id, text=text, completed=task_update.completed)
    finally:
        await conn.close()

@app.delete('/api/tasks/{task_id}', response_model=dict)
async def delete_task(task_id: int):
    conn = await get_db_connection()
    try:
        statement = 'DELETE FROM tasks WHERE id = $1;'
        result = await conn.execute(statement, task_id)
        if result == 'DELETE 0':
            raise HTTPException(status_code=404, detail="Task not found")
        return {'success': True}
    finally:
        await conn.close()