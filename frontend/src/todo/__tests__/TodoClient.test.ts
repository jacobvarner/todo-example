import axios from "axios";
import {addTodo, editTodo, getTodos, toggleArchive, toggleStatus} from "../TodoClient.ts";
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
            points: 5,
            status: "incomplete"
        }
        await addTodo(testTodoToAdd);
        expect(axiosSpy).toHaveBeenCalledWith('/api/todo', testTodoToAdd);
    });

    it('should return created todo', async () => {
        const testTodoToAdd: Todo = {
            name: "Test todo",
            description: "Test description",
            assignee: "Test person",
            points: 5,
            status: "incomplete"
        }
        vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { ...testTodoToAdd, id: 1} });
        const result = await addTodo(testTodoToAdd);
        expect(result).toEqual({...testTodoToAdd, id: 1})
    });

    it('should call axios PATCH to toggle status', async () => {
        const idToToggle = 34;
        const axiosSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({})
        await toggleStatus(idToToggle);
        expect(axiosSpy).toHaveBeenCalledWith("/api/todo/status/" + idToToggle);
    });


    it.each([200, 404])('should return %d status from patch request when result has %d status', async (status) => {
        vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status });
        const result = await toggleStatus(23);
        expect(result).toEqual(status);
    });

    it('should call axios POST to update todo', async () => {
        const testTodo: Todo = {
            id: 2,
            name: "Test todo",
            description: "Test description",
            status: "incomplete",
            points: 5,
            assignee: "Test person"
        };
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({});
        await editTodo(testTodo);
        expect(axiosPostSpy).toHaveBeenCalledWith("/api/todo/" + testTodo.id, testTodo);
    });

    it('should call axios PATCH to toggle archive', async () => {
        const idToToggle = 34;
        const axiosSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({})
        await toggleArchive(idToToggle);
        expect(axiosSpy).toHaveBeenCalledWith("/api/todo/archive/" + idToToggle);
    });


    it.each([200, 404])('should return %d status from archive patch request when result has %d status', async (status) => {
        vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status });
        const result = await toggleArchive(23);
        expect(result).toEqual(status);
    });
});