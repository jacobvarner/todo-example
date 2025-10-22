import {useState} from "react";
import type {Todo} from "./Todo.ts";

interface TodoDialogProps {
    handleClose: () => void,
    addTodo: (todo: Todo) => void
}
export const TodoDialog = ({handleClose, addTodo}: TodoDialogProps) => {
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [points, setPoints] = useState<number>(0);
    const [assignee, setAssignee] = useState<string>();

    const handleSubmit = () => {
        addTodo({
            name: name ?? "No Name",
            description: description ?? "No Description",
            status: "incomplete",
            points: points,
            assignee: assignee
        });
        handleClose();
    }

    return <div role={"dialog"} aria-label={"Add Todo Dialog"} className={"border-2 border-black flex flex-col gap-2 w-[400px]"}>
        <h2 className={"text-center text-2xl text-black"}>Add New Todo</h2>
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
        <span className={"flex flex-row"}>
            <label htmlFor={"points"} className={"font-bold mx-2"}>Points</label>
            <input id={"points"}
                   name={"points"}
                   type={"number"}
                   min={0}
                   className={"border border-black p-1"}
                   value={points}
                   onChange={(e) => setPoints(Number.parseInt(e.target.value))}/>
        </span>
        <span className={"flex flex-row"}>
            <label htmlFor={"assignee"} className={"font-bold mx-2"}>Assign to</label>
            <input id={"assignee"}
                   name={"assignee"}
                   type={"text"}
                   className={"border border-black p-1"}
                   value={assignee}
                   onChange={(e) => setAssignee(e.target.value)}/>
        </span>
        <span className={"flex flex-row justify-end m-2"}>
            <button onClick={handleClose}
                    className={"border-black border text-black p-2 mr-2"}>Close</button>
            <button onClick={handleSubmit}
                    className={"border-black bg-gray-600 p-2 text-white"}>Submit</button>
        </span>
    </div>;
}