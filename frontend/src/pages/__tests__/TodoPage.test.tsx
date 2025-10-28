import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { TodoPage } from "../TodoPage.tsx";
import {userEvent} from "@testing-library/user-event";
import * as TodoClient from "../../todo/TodoClient.ts"
import {act} from "react";
import * as ReactRouter from 'react-router';
import * as TodoListClient from '../../todoList/TodoListClient'

describe('Todo Page', () => {
    vi.spyOn(TodoClient, 'getTodos').mockResolvedValue([]);
    vi.spyOn(ReactRouter, 'useParams').mockReturnValue({id: "23"});
    vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValue({ id: 23, name: "Test 23", description: "23rd todo list", todos: []})

    it('should display the title', async () => {
        render(<TodoPage/>)
        expect(await screen.findByRole("heading", {name: /Test 23/i})).toBeVisible();
    })

    it('should show a button to add todos', async () => {
        render(<TodoPage/>);
        expect(await screen.findByRole("button", { name: "Add Todo"})).toBeVisible();
    })

    it('should not show "add todo" modal on load', () => {
        render(<TodoPage/>);
        expect(screen.queryByRole("dialog", {name: "Add Todo Dialog"})).toBeNull();
    })

    it('should display "add todo" modal when add button is clicked', async () => {
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(await screen.findByRole("button", { name: "Add Todo"}));
        expect(screen.getByRole("dialog", { name: "Add Todo Dialog"})).toBeVisible();
    })

    it('should close "add todo" modal when close button is clicked', async () => {
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(await screen.findByRole("button", { name: "Add Todo"}));
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(screen.queryByRole("dialog", { name: "Add Todo Dialog"})).toBeNull();
    })

    it('should display all todos', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}, {id: 2, name: "test 2", status: "incomplete"}]})
        render(<TodoPage/>);
        expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    })

    it('should toggle a todo when clicked', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const toggleSpy = vi.spyOn(TodoClient, 'toggleStatus').mockResolvedValueOnce(200);
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const markCompleteButton = within(todo).getByRole("button", {name: "Mark Complete"});
        await act(async () => {
            await user.click(markCompleteButton);
        })
        expect(await within(todo).findByRole("button", { name: "Mark Incomplete"})).toBeVisible();
        expect(toggleSpy).toHaveBeenCalledWith(1);
    })

    it('should not toggle status when client returns 404', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const toggleSpy = vi.spyOn(TodoClient, 'toggleStatus').mockResolvedValueOnce(404);
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const markCompleteButton = within(todo).getByRole("button", {name: "Mark Complete"});
        await act(async () => {
            await user.click(markCompleteButton);
        })
        expect(await within(todo).findByRole("button", { name: "Mark Complete"})).toBeVisible();
        expect(toggleSpy).toHaveBeenCalledWith(1);
    });

    it('should not toggle status when client request is rejected', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const toggleSpy = vi.spyOn(TodoClient, 'toggleStatus').mockRejectedValueOnce({});
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const markCompleteButton = within(todo).getByRole("button", {name: "Mark Complete"});
        await act(async () => {
            await user.click(markCompleteButton);
        })
        expect(await within(todo).findByRole("button", { name: "Mark Complete"})).toBeVisible();
        expect(toggleSpy).toHaveBeenCalledWith(1);
    });

    it('should display "edit todo" modal when an edit button is clicked', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(await screen.findByRole("button", { name: "Edit"}));
        expect(screen.getByRole("dialog", { name: "Edit Todo Dialog"})).toBeVisible();
    });

    it('should reset form when close is clicked', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(await screen.findByRole("button", { name: "Edit"}));
        await user.click(screen.getByRole("button", { name: "Close"}));
        await user.click(screen.getByRole("button", { name: "Add Todo"}));
        expect(screen.getByRole("dialog", { name: "Add Todo Dialog"})).toBeVisible();
    });

    it('should reset form when submit is clicked', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        vi.spyOn(TodoClient, 'addTodo').mockResolvedValueOnce({id: 2, name: "test 1", status: "incomplete"});
        vi.spyOn(TodoClient, 'editTodo').mockResolvedValueOnce();
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(await screen.findByRole("button", { name: "Edit"}));
        await user.click(screen.getByRole("button", { name: "Submit"}));
        await user.click(screen.getByRole("button", { name: "Add Todo"}));
        expect(screen.getByRole("dialog", { name: "Add Todo Dialog"})).toBeVisible();
    });

    it('should archive a todo when clicked', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const toggleSpy = vi.spyOn(TodoClient, 'toggleArchive').mockResolvedValueOnce(200);
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const archiveButton = within(todo).getByRole("button", {name: "Archive"});
        await act(async () => {
            await user.click(archiveButton);
        })
        expect(toggleSpy).toHaveBeenCalledWith(1);
        expect(screen.queryByRole("listitem", { name: "test 1"})).toBeNull();
    })

    it('should not archive when client returns 404', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}]})
        const toggleSpy = vi.spyOn(TodoClient, 'toggleArchive').mockResolvedValueOnce(404);
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const archiveButton = within(todo).getByRole("button", {name: "Archive"});
        await act(async () => {
            await user.click(archiveButton);
        })
        expect(todo).toBeVisible();
        expect(toggleSpy).toHaveBeenCalledWith(1);
    });

    it('should not show archived todos', async () => {
        vi.spyOn(TodoListClient, 'getTodoList').mockResolvedValueOnce({ id: 23, name: "Test 23", description: "23rd todo list", todos: [{id: 1, name: "test 1", status: "incomplete"}, {id: 2, name: "test 2", status: "archived"}]})
        render(<TodoPage/>);
        expect(await screen.findByRole("listitem", { name: "test 1"})).toBeVisible();
        expect(screen.queryByRole("listitem", { name: "test 2"})).toBeNull();
    })

})