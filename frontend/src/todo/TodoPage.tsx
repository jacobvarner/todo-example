import {useEffect, useState} from 'react';
import type {Todo} from "./Todo.ts";
import {TodoItem} from "./TodoItem.tsx";

export const TodoPage =() => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // This runs when the component loads
    useEffect(() => {
        // Replace this with your task fetching logic
        const tasks: Todo[] = [
            { id: 1, name: "Step 1", description: "Set up project structure", status: "active" },
            { id: 2, name: "Step 2", description: "Add component tests", status: "active" },
            { id: 3, name: "Step 3", description: "Add component", status: "active" }
        ];
        setTodos(tasks);
    }, []);


    return (
        <>
            <h2>My Todo Page</h2>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todoTask={todo} />
                    ))}
            </ul>
        </>
    );
};

export default TodoPage;