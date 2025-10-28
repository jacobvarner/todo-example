import type {Todo} from "../todo/Todo.ts";

export type TodoList = {
    id?: number,
    name: string,
    description: string,
    todos?: Todo[]
}