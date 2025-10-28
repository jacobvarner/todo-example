import {TodoItem} from "../todo/TodoItem.tsx";
import type {Todo} from "../todo/Todo.ts";
import {useEffect, useState} from "react";
import {TodoDialog} from "../todo/TodoDialog.tsx";
import {addTodo, editTodo, getTodos, toggleArchive, toggleStatus} from "../todo/TodoClient.ts";

export const TodoPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [currentTodo, setCurrentTodo] = useState<Todo | undefined>()
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

    const handleEditTodo = async (todoToUpdate: Todo) => {
        await editTodo(todoToUpdate);
        setTodos([...todos.map(todo => todo.id === todoToUpdate.id ? todoToUpdate : todo)])
    }

    const handleEdit = (todo: Todo) => {
        setCurrentTodo(todo);
        setIsDialogOpen(true);
    }

    const handleOpen = () => {
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setCurrentTodo(undefined);
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

    const handleArchive = (id: number) => {
        toggleArchive(id)
            .then(status => {
                if (status === 200) {
                    setTodos(todos.map(todo => {
                        if (todo.id === id) return { ...todo, status: "archived"};
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
            <h2 className={"text-4xl text-black mb-4"}>My Todo Page</h2>
            <button onClick={handleOpen} className={"border-black bg-gray-400 p-2 text-black w-[200px] h-[40px]"}>Add Todo</button>
            <ul>
                {todos.filter(todo => todo.status !== "archived").map(todo => <TodoItem key={todo.id} todo={todo} handleToggle={handleToggle} handleEdit={handleEdit} handleArchive={handleArchive} />)}
            </ul>
            {isDialogOpen && <TodoDialog handleClose={handleClose} addTodo={handleAddTodo} editTodo={handleEditTodo} todoToEdit={currentTodo}/>}
        </>
    );
};