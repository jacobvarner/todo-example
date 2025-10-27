import axios from "axios";
import type {Todo} from "./Todo.ts";

export const getTodos = async (): Promise<Todo[]> => {
    const result = await axios.get('/api/todo');
    return result.data;
}

export const addTodo = async (todoToAdd: Todo): Promise<Todo> => {
    const result = await axios.post('/api/todo', todoToAdd);
    return result.data;
}

export const toggleStatus = async (idToToggle: number): Promise<number> => {
    const result = await axios.patch('/api/todo/' + idToToggle);
    return result.status;
}

export const editTodo = async (todoToEdit: Todo): Promise<void> => {
    await axios.post("/api/todo/" + todoToEdit.id, todoToEdit);
}