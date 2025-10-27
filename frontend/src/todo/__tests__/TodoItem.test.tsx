import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {TodoItem} from "../TodoItem.tsx";
import type {Todo} from "../Todo.ts";
import {userEvent} from "@testing-library/user-event";

const testTodo: Todo = {
    id: 1,
    name: "Test Todo",
    description: "This is a placeholder todo for testing.",
    status: "incomplete",
    points: 5
}

describe('Todo Item', () => {
    it('should display a title for the todo', () => {
        render(<TodoItem todo={testTodo} handleToggle={vi.fn()}/>);
        expect(screen.getByRole("heading", {name: testTodo.name})).toBeVisible();
    });

    it('should display a description for the todo', () => {
        render(<TodoItem todo={testTodo} handleToggle={vi.fn()}/>);
        expect(screen.getByRole('paragraph', {name: "description"})).toHaveTextContent(testTodo.description!);
    })

    it('should display the point value if it is greater than 0', () => {
        render(<TodoItem todo={testTodo} handleToggle={vi.fn()}/>);
        expect(screen.getByRole('paragraph', {name: "points value"})).toHaveTextContent(testTodo.points + " Points");
    })

    it('should not display the point value if it is worth 0 points', () => {
        render(<TodoItem todo={{...testTodo, points: 0}} handleToggle={vi.fn()}/>);
        expect(screen.queryByRole("paragraph", { name: "points value"})).toBeNull();
    })

    it('should display the assignee if there is one', () => {
        render(<TodoItem todo={{...testTodo, assignee: "Person 1"}} handleToggle={vi.fn()}/>);
        expect(screen.getByRole('paragraph', {name: "assignee"})).toHaveTextContent("Person 1");
    })

    it('should not display the assignee if there is not someone assigned', () => {
        render(<TodoItem todo={testTodo} handleToggle={vi.fn()}/>);
        expect(screen.queryByRole("paragraph", { name: "assignee"})).toBeNull();
    })

    it('should display a button to complete the todo if it is incomplete', () => {
        render(<TodoItem todo={testTodo} handleToggle={vi.fn()}/>);
        expect(screen.getByRole("button", {name: "Mark Complete"})).toBeVisible();
    })

    it('should display a button to un-complete the todo if it has accidentally been completed', () => {
        render(<TodoItem todo={{...testTodo, status: "complete"}} handleToggle={vi.fn()}/>);
        expect(screen.getByRole("button", {name: "Mark Incomplete"})).toBeVisible();
    })

    it('should call a handleToggle function when complete button is clicked', async () => {
        const mockHandleToggle = vi.fn();
        const user = userEvent.setup();
        render(<TodoItem todo={testTodo} handleToggle={mockHandleToggle}/>);
        await user.click(screen.getByRole("button", { name: "Mark Complete"}));
        expect(mockHandleToggle).toHaveBeenCalledWith(testTodo.id);
    })

    it('should call a handleToggle function when incomplete button is clicked', async () => {
        const mockHandleToggle = vi.fn();
        const user = userEvent.setup();
        render(<TodoItem todo={{...testTodo, status: "complete"}} handleToggle={mockHandleToggle}/>);
        await user.click(screen.getByRole("button", { name: "Mark Incomplete"}));
        expect(mockHandleToggle).toHaveBeenCalledWith(testTodo.id);
    })
});