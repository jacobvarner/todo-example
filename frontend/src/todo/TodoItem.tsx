import {useState} from "react";
import type {Todo} from "./Todo";

type TodoItemProps = {todoTask: Todo};

export const TodoItem = ({todoTask}: TodoItemProps) => {
    const [todo, setTodo] = useState<Todo>(todoTask);

    return (
        <li className="">
           <span className="">{todo.name}</span>
        </li>
    )
}