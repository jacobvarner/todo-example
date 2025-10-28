import axios from "axios";
import {expect} from "vitest";
import type {TodoList} from "../TodoList.ts";
import {addTodoList, getTodoLists, getTodoList} from "../TodoListClient.ts";

describe('Todo List Client', () => {
   it('should call axios GET to get all todo lists', async () => {
       const axiosSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({});
       await getTodoLists();
       expect(axiosSpy).toHaveBeenCalledWith('/api/todo-list');
   });

   it('should return all todo lists', async () => {
       const testTodoLists = [{id: 1, name: "test 1", description: "description 1", todos: []}, {id: 2, name: "test 2", description: "description 2", todos: []}];
       vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: testTodoLists });
       const result = await getTodoLists();
       expect(testTodoLists).toEqual(result);
   })

    it('should call axios GET to get a todo list by id', async () => {
        const testId = 23;
        const axiosSpy = vi.spyOn(axios, 'get').mockResolvedValueOnce({});
        await getTodoList(testId);
        expect(axiosSpy).toHaveBeenCalledWith('/api/todo-list/' + testId);
    });

    it('should return a todo list by id', async () => {
        const testId = 1;
        const testTodoList = {id: testId, name: "test 1", description: "description 1", todos: []};
        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: testTodoList });
        const result = await getTodoList(testId);
        expect(testTodoList).toEqual(result);
    });

    it('should call axios POST to add a todo', async () => {
        const axiosSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({});
        const testTodoListToAdd: TodoList = {
            name: "Test List",
            description: "Test description",
            todos: []
        }
        await addTodoList(testTodoListToAdd);
        expect(axiosSpy).toHaveBeenCalledWith('/api/todo-list', testTodoListToAdd);
    });

    it('should return created todo list', async () => {
        const testTodoListToAdd: TodoList = {
            name: "Test todo",
            description: "Test description",
            todos: []
        }
        vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { ...testTodoListToAdd, id: 1} });
        const result = await addTodoList(testTodoListToAdd);
        expect(result).toEqual({...testTodoListToAdd, id: 1})
    });
});