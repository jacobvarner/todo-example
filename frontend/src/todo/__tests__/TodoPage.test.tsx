import {render, screen, within} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import { TodoPage } from "../TodoPage.tsx";
import {userEvent} from "@testing-library/user-event";

describe('Todo Page', () => {
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

    it('should display all todos', () => {
        render(<TodoPage/>);
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    })

    it('should toggle a todo when clicked', async () => {
        render(<TodoPage/>);
        const user = userEvent.setup();
        const todo = screen.getByRole("listitem", {name: "Test 1"});
        const markCompleteButton = within(todo).getByRole("button", {name: "Mark Complete"});
        await user.click(markCompleteButton);
        expect(within(todo).getByRole("button", { name: "Mark Incomplete"})).toBeVisible();
    })
})