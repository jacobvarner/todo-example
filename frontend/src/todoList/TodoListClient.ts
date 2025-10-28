import axios from "axios";
import type {TodoList} from "./TodoList.ts";

export const getTodoLists = async (): Promise<TodoList[]> => {
    const result = await axios.get('/api/todo-list');
    return result.data;
}

export const getTodoList = async (todoListId: number): Promise<TodoList> => {
   const result = await axios.get('/api/todo-list/' + todoListId);
   return result.data;
}

export const addTodoList = async (todoList: TodoList): Promise<TodoList> => {
    const result = await axios.post('/api/todo-list', todoList);
    return result.data;
}