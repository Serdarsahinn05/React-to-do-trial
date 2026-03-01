import React, {useState, useEffect, ChangeEvent} from 'react'

interface TodoItem { text: string; isCompleted: boolean; }

function ToDoList() {




    const [tasks, setTasks] = useState<TodoItem[]>(() => {
        const savedTasks = localStorage.getItem("todoTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState<string>('');


    useEffect(() => {
        localStorage.setItem("todoTasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function addTask() {

        if (newTask.trim() !== "") {
            const newEntry: TodoItem = { text: newTask, isCompleted: false };
            setTasks(t => [...t, newEntry]);
            setNewTask('');
        }

    }


    function deleteTask(index: number): void {
        const updatedTasks:TodoItem[] = tasks.filter((_, i:number) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index:number):void {

        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function moveTaskDown(index:number):void {

        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }

    }

    function toggleCheck(index: number) {

        const updatedTasks:TodoItem[] = tasks.map((task, i:number) =>
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
    }

    function deleteAllTasks():void {
        if (window.confirm("Tüm görevleri silmek istediğine emin misin?")) {
            setTasks([]);
        }
    }


    return (
        <div className="to-do-list">
            <h1>To Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter Task..."
                    value={newTask}
                    onChange={handleInputChange}
                />

                <button
                    className="add-button"
                    onClick={addTask}
                >
                    Add Task
                </button>


                <ol>
                    {tasks.map((task, index) =>
                        <li key={index}>
                            {/* 1. Checkbox'ı ekliyoruz */}
                        <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => toggleCheck(index)}
                        />
                        <span
                            className="text"
                            style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
                            onClick={() => toggleCheck(index)}
                        >
                            {task.text}
                        </span>


                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}>
                                Delete
                            </button>

                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}>
                                👆🏻
                            </button>

                            <button
                                className="move-button"
                                onClick={() => moveTaskDown(index)}>
                                👇🏻
                            </button>


                        </li>
                    )}
                </ol>

                <button
                    className="clear-button"
                    onClick={deleteAllTasks}
                >
                    Delete All Tasks
                </button>


            </div>



        </div>);

}

export default ToDoList;



