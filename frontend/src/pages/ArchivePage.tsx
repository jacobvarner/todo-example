import {useEffect, useState} from "react";
import {getTodos, toggleArchive} from "../todo/TodoClient.ts";
import type {Todo} from "../todo/Todo.ts";
import {TodoItem} from "../todo/TodoItem.tsx";

export const ArchivePage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        (async () => {
            setTodos(await getTodos());
        })();
    }, [])

    const handleToggleError = () => {
        console.log("Toggle failed");
    }

    const handleRestore = (id: number) => {
        toggleArchive(id)
            .then(status => {
                if (status === 200) {
                    setTodos(todos.map(todo => {
                        if (todo.id === id) return { ...todo, status: "incomplete"};
                        return todo;
                    }));
                } else {
                    handleToggleError()
                }
            })
            .catch(handleToggleError);
    }

    return (
        <>
            <h2 className={"text-4xl text-black mb-4"}>Archived Todos</h2>
            <ul>
                {todos.filter(todo => todo.status === "archived").map(todo => <TodoItem key={todo.id} todo={todo} handleArchive={handleRestore} />)}
            </ul>
        </>
    );
};