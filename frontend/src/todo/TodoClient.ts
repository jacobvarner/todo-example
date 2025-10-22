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