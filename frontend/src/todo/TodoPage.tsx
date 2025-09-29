import {useState} from 'react';
import type {Todo} from "./Todo.ts";

export const TodoPage =() => {
    const [todos] = useState<Todo[]>([]);

    return (
        <h2>My Todo Page</h2>

    );
};

export default TodoPage;