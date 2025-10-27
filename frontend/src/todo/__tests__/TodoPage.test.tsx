import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { TodoPage } from "../TodoPage.tsx";
import {userEvent} from "@testing-library/user-event";
import * as TodoClient from "../TodoClient.ts"
import {act} from "react";

describe('Todo Page', () => {
    vi.spyOn(TodoClient, 'getTodos').mockResolvedValue([]);

    it('should display the title', async () => {
        render(<TodoPage/>)
        expect(screen.getByRole("heading", {name: /my todo page/i})).toBeVisible()
    })

    it('should show a button to add todos', () => {
        render(<TodoPage/>);
        expect(screen.getByRole("button", { name: "Add Todo"})).toBeVisible();
    })

    it('should not show "add todo" modal on load', () => {
        render(<TodoPage/>);
        expect(screen.queryByRole("dialog", {name: "Add Todo Dialog"})).toBeNull();
    })

    it('should display "add todo" modal when add button is clicked', async () => {
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(screen.getByRole("button", { name: "Add Todo"}));
        expect(screen.getByRole("dialog", { name: "Add Todo Dialog"})).toBeVisible();
    })

    it('should close "add todo" modal when close button is clicked', async () => {
        const user = userEvent.setup();
        render(<TodoPage/>);
        await user.click(screen.getByRole("button", { name: "Add Todo"}));
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(screen.queryByRole("dialog", { name: "Add Todo Dialog"})).toBeNull();
    })

    it('should display all todos', async () => {
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "incomplete"}, {id: 2, name: "test 2", status: "incomplete"}]);
        render(<TodoPage/>);
        expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    })

    it('should toggle a todo when clicked', async () => {
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "incomplete"}]);
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
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "incomplete"}]);
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
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "incomplete"}]);
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
})