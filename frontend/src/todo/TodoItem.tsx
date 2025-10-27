import type {Todo} from "./Todo.ts";

interface TodoItemProps {
    todo: Todo,
    handleToggle: (id: number) => void,
    handleEdit: (todo: Todo) => void
}
export const TodoItem = ({todo, handleToggle, handleEdit}: TodoItemProps) => {
    return (
        <li aria-label={todo.name}
            className={"flex flex-row border-2 border-gray-600 bg-gray-300 m-2 p-2 justify-between"}>
            <div className={"text-left align-middle justify-between"}>
                <h3 className={"text-xl text-black"}>{todo.name}</h3>
                <p aria-label={"description"}>
                    {todo.description}
                </p>
                <span className={"flex flex-row"}>
                    {!!todo.points && <p aria-label={"points value"} className={"mr-2"}>{todo.points} Points</p>}
                    {todo.assignee && <p aria-label={"assignee"} className={"italic"}>Assigned to {todo.assignee}</p>}
                </span>


            </div>
            <div className={"flex flex-row"}>
                <button className={"align-bottom border-black bg-gray-600 p-2 text-white h-[40px] mr-2"} onClick={() => handleEdit(todo)}>Edit</button>
                <button
                    className={"align-bottom border-black bg-gray-600 p-2 text-white h-[40px]"}
                    onClick={() => handleToggle(todo.id!)}>Mark {todo.status === "complete" ? "Incomplete" : "Complete"}</button>
            </div>
        </li>
    );
}