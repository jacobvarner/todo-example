import {TodoItem} from "./TodoItem.tsx";
import type {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import {TodoDialog} from "./TodoDialog.tsx";
import {addTodo, getTodos, toggleStatus} from "./TodoClient.ts";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setTodos(await getTodos());
        })();
    }, [])

    const handleAddTodo = async (todoToAdd: Todo) => {
        const savedTodo = await addTodo(todoToAdd);
        setTodos([...todos, savedTodo]);
    }

    const handleOpen = () => {
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleToggleError = () => {
        console.log("Toggle failed");
    }

    const handleToggle = async (id: number) => {
        toggleStatus(id)
            .then((status) => {
                if (status === 200) {
                    setTodos(todos.map(todo => {
                        if (todo.id === id) {
                            if (todo.status === "incomplete") {
                                return {...todo, status: "complete"};
                            } else {
                                return {...todo, status: "incomplete"};
                            }
                        } else {
                            return todo;
                        }
                    }))
                } else {
                    handleToggleError()
                }
            })
            .catch(handleToggleError);
    }

    return (
        <>
            <h2 className={"text-4xl text-black mb-4"}>My Todo Page</h2>
            <button onClick={handleOpen} className={"border-black bg-gray-400 p-2 text-black w-[200px] h-[40px]"}>Add
                Todo
            </button>
            <ul>
                {todos.map(todo => <TodoItem key={todo.id} todo={todo} handleToggle={handleToggle}/>)}
            </ul>
            {isDialogOpen && <TodoDialog handleClose={handleClose} addTodo={handleAddTodo}/>}
        </>
    );
};