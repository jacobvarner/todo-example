import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {TodoPage} from "../TodoPage.tsx";
import {userEvent} from "@testing-library/user-event";
import * as TodoClient from "../TodoClient.ts"

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
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1"}, {id: 2, name: "test 2"}]);
        render(<TodoPage/>);
        expect(await screen.findAllByRole("listitem")).toHaveLength(2);
    })
})