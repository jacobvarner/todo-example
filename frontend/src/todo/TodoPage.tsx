import {TodoItem} from "./TodoItem.tsx";
import type {Todo} from "./Todo.ts";
import {useEffect, useState} from "react";
import {TodoDialog} from "./TodoDialog.tsx";
import axios from "axios";

export const TodoPage = () => {
    const listOfTodos: Todo[] = [
        {id: 1, name: "Test 1", description: "This is a test todo", status: "incomplete", points: 5},
        {id: 2, name: "Test 2", description: "This is another test todo", status: "incomplete", points: 0},
        {id: 3, name: "Teach Mod-A Friday Class", description: "Continue to go over React testing and building out the start of a todo list application", status: "incomplete", points: 99, assignee: "Jacob & Jeff"}
    ]

    const [todos, setTodos] = useState<Todo[]>(listOfTodos);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        axios.get("/api/todo").then(
            result => {
                setTodos(result.data)
            }
        );
    }, [])

    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
    }

    const handleOpen = () => {
        setIsDialogOpen(true);
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleToggle = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                if (todo.status === "incomplete") {
                    return { ...todo, status: "complete" };
                } else {
                    return { ...todo, status: "incomplete" };
                }
            } else {
                return todo;
            }
        }))
    }

    return (
        <>
            <h2 className={"text-4xl text-black mb-4"}>My Todo Page</h2>
            <button onClick={handleOpen} className={"border-black bg-gray-400 p-2 text-black w-[200px] h-[40px]"}>Add Todo</button>
            <ul>
                {todos.map(todo => <TodoItem todo={todo} handleToggle={handleToggle}/>)}
            </ul>
            {isDialogOpen && <TodoDialog handleClose={handleClose} addTodo={addTodo}/>}
        </>
    );
};