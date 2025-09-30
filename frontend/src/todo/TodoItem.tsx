import {useState} from "react";
import type {Todo} from "./Todo";

type TodoItemProps = { todoTask: Todo };

export const TodoItem = ({todoTask}: TodoItemProps) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <li className="">
            <span aria-label={todoTask.name} name={todoTask.name} className="">{todoTask.name}</span>
            <input aria-label="status" name="status" type="checkbox" checked={isChecked} value={todoTask.status} onChange={handleChange} />
            <span>{isChecked ? 'complete': 'active'}</span>
        </li>
    )
}