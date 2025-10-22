import axios from "axios";
import {getTodos} from "../TodoClient.ts";
import {expect} from "vitest";

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
});