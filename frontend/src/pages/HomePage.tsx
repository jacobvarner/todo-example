import {useEffect, useState} from "react";
import type {TodoList} from "../todoList/TodoList.ts";
import {addTodoList, getTodoLists} from "../todoList/TodoListClient.ts";
import {TodoListDialog} from "../todoList/TodoListDialog.tsx";

export const HomePage = () => {
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setTodoLists(await getTodoLists());
        })();
    }, [])

    const handleAddTodoList = async (todoListToAdd: TodoList) => {
        const savedTodoList = await addTodoList(todoListToAdd);
        setTodoLists([...todoLists, savedTodoList]);
    }

    const handleOpen = () => {
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <h2 className={"text-4xl text-black mb-4"}>Todo Lists</h2>
            <button onClick={handleOpen} className={"border-black bg-gray-400 p-2 text-black w-[200px] h-[40px]"}>Add Todo List</button>
            <ul>
                {todoLists.map(todoList => <li><a className={"underline text-blue-700"} href={"/todo-list/" + todoList.id}>{todoList.name}</a></li>)}
            </ul>
            {isDialogOpen && <TodoListDialog handleClose={handleClose} addTodoList={handleAddTodoList} />}
        </>
    );
};