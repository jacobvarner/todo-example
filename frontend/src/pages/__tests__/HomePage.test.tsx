import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {userEvent} from "@testing-library/user-event";
import * as TodoListClient from "../../todoList/TodoListClient.ts"
import {HomePage} from "../HomePage.tsx";

describe('Home Page', () => {
    vi.spyOn(TodoListClient, 'getTodoLists').mockResolvedValue([]);

    it('should display the title', async () => {
        render(<HomePage/>)
        expect(screen.getByRole("heading", {name: /Todo Lists/i})).toBeVisible()
    })

    it('should show a button to add todo lists', () => {
        render(<HomePage/>);
        expect(screen.getByRole("button", { name: "Add Todo List"})).toBeVisible();
    })

    it('should not show "add todo list" modal on load', () => {
        render(<HomePage/>);
        expect(screen.queryByRole("dialog", {name: "Add Todo List Dialog"})).toBeNull();
    })

    it('should display "add todo list" modal when add button is clicked', async () => {
        const user = userEvent.setup();
        render(<HomePage/>);
        await user.click(screen.getByRole("button", { name: "Add Todo List"}));
        expect(screen.getByRole("dialog", { name: "Add Todo List Dialog"})).toBeVisible();
    })

    it('should close "add todo list" modal when close button is clicked', async () => {
        const user = userEvent.setup();
        render(<HomePage/>);
        await user.click(screen.getByRole("button", { name: "Add Todo List"}));
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(screen.queryByRole("dialog", { name: "Add Todo List Dialog"})).toBeNull();
    })

    it('should display all todo lists', async () => {
        vi.spyOn(TodoListClient, 'getTodoLists').mockResolvedValueOnce([{id: 1, name: "test 1", description: "description 1"}, {id: 2, name: "test 2", description: "incomplete"}]);
        render(<HomePage/>);
        expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    })
})