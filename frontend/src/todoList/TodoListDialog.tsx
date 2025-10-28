import {useState} from "react";
import type {TodoList} from "./TodoList.ts";

interface TodoListDialogProps {
    handleClose: () => void,
    addTodoList: (todoList: TodoList) => void
}
export const TodoListDialog = ({handleClose, addTodoList}: TodoListDialogProps) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();

    const handleBlank = (value: string | undefined, defaultValue: string) => {
        if (value && value !== '') return value;
        return defaultValue;
    }

    const handleSubmit = () => {
        const todoListToSave: TodoList = {
            name: handleBlank(name, "No Name"),
            description: handleBlank(description, "No Description")
        }
        addTodoList(todoListToSave);
        handleClose();
    }

    return <div role={"dialog"} aria-label={"Add Todo List Dialog"} className={"border-2 border-black flex flex-col gap-2 w-[400px]"}>
        <h2 className={"text-center text-2xl text-black"}>{"Add New Todo List"}</h2>
        <span className={"flex flex-row"}>
            <label htmlFor={"name"} className={"font-bold mx-2"}>Name</label>
            <input id={"name"}
                   name={"name"}
                   type={"text"}
                   className={"border border-black p-1"}
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>
        </span>
        <span className={"flex flex-row"}>
            <label htmlFor={"description"} className={"font-bold mx-2"}>Description</label>
            <input id={"description"}
                   name={"description"}
                   type={"text"}
                   className={"border border-black p-1"}
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}/>
        </span>
        <span className={"flex flex-row justify-end m-2"}>
            <button onClick={handleClose}
                    className={"border-black border text-black p-2 mr-2"}>Close</button>
            <button onClick={handleSubmit}
                    className={"border-black bg-gray-600 p-2 text-white"}>Submit</button>
        </span>
    </div>;
}