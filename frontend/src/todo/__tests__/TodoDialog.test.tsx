import {TodoDialog} from "../TodoDialog.tsx";
import {render, screen} from "@testing-library/react";
import {describe, expect} from "vitest";
import {userEvent} from "@testing-library/user-event";

describe('TodoDialog', () => {
    it('should have a title', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("heading", { name: "Add New Todo"})).toBeVisible();
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Name"})).toBeVisible()
    })

    it('should have a text input for description', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Description"})).toBeVisible()
    })

    it('should have a number input for points', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("spinbutton", { name: "Points"})).toBeVisible()
    })

    it('should have a text input for assignee', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Assign to"})).toBeVisible()
    })

    it('should have a close button', () => {
        render(<TodoDialog handleClose={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("button", { name: "Close"})).toBeVisible();
    })

    it('should call "handleClose" when close button is clicked', async () => {
        const mockHandleClose = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={mockHandleClose} addTodo={vi.fn()}/>);
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(mockHandleClose).toHaveBeenCalled();
    })

    it('should call "addTodo" when submit button is clicked', async () => {
        const mockAddTodo = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} addTodo={mockAddTodo} />);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodo).toHaveBeenCalled();
    })

    it('should call "addTodo" with default values when the form is not filled out', async () => {
        const mockAddTodo = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} addTodo={mockAddTodo} />);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodo).toHaveBeenCalledWith({
            name: "No Name",
            description: "No Description",
            status: "incomplete",
            points: 0
        });
    })

    it('should call "addTodo" with filled out fields', async () => {
        const mockAddTodo = vi.fn();
        const testTodo = {
            name: "Test Todo",
            description: "Test Description",
            status: "incomplete",
            assignee: "Test Person",
            points: 5
        }
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} addTodo={mockAddTodo} />);
        await user.type(screen.getByRole("textbox", { name: "Name"}), testTodo.name);
        await user.type(screen.getByRole("textbox", { name: "Description"}), testTodo.description);
        await user.type(screen.getByRole("textbox", { name: "Assign to"}), testTodo.assignee);
        await user.type(screen.getByRole("spinbutton", { name: "Points"}), testTodo.points.toString());
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodo).toHaveBeenCalledWith(testTodo);
    })
})