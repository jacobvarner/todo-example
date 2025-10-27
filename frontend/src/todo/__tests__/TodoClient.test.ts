import axios from "axios";
import {addTodo, getTodos} from "../TodoClient.ts";
import {expect} from "vitest";
import type {Todo} from "../Todo.ts";

describe('Todo Client', () => {
   it('should call axios GET to get all todos', async () => {
       const axiosSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({});
       await getTodos();
       expect(axiosSpy).toHaveBeenCalledWith('/api/todo');
   });

   it('should return all todos', async () => {
       const testTodos = [{id: 1, name: "test 1"}, {id: 2, name: "test 2"}];
       vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: testTodos });
       const result = await getTodos();
       expect(testTodos).toEqual(result);
   })

    it('should call axios POST to add a todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({});
        const testTodoToAdd: Todo = {
            name: "Test todo",
            description: "Test description",
            assignee: "Test person",
            points: 5
        }
        await addTodo(testTodoToAdd);
        expect(axiosSpy).toHaveBeenCalledWith('/api/todo', testTodoToAdd);
    });

    it('should return created todo', async () => {
        const testTodoToAdd: Todo = {
            name: "Test todo",
            description: "Test description",
            assignee: "Test person",
            points: 5
        }
        vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { ...testTodoToAdd, id: 1} });
        const result = await addTodo(testTodoToAdd);
        expect(result).toEqual({...testTodoToAdd, id: 1})
    });
});