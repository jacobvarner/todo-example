import {TodoDialog} from "../TodoDialog.tsx";
import {render, screen} from "@testing-library/react";
import {describe, expect} from "vitest";
import {userEvent} from "@testing-library/user-event";
import type {Todo} from "../Todo.ts";

describe('TodoDialog', () => {
    it('should have a title', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("heading", { name: "Add New Todo"})).toBeVisible();
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Name"})).toBeVisible()
    })

    it('should have a text input for description', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Description"})).toBeVisible()
    })

    it('should have a number input for points', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("spinbutton", { name: "Points"})).toBeVisible()
    })

    it('should have a text input for assignee', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Assign to"})).toBeVisible()
    })

    it('should have a close button', () => {
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        expect(screen.getByRole("button", { name: "Close"})).toBeVisible();
    })

    it('should call "handleClose" when close button is clicked', async () => {
        const mockHandleClose = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={mockHandleClose} editTodo={vi.fn()} addTodo={vi.fn()}/>);
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(mockHandleClose).toHaveBeenCalled();
    })

    it('should call "addTodo" when submit button is clicked', async () => {
        const mockAddTodo = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={mockAddTodo} />);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodo).toHaveBeenCalled();
    })

    it('should call "addTodo" with default values when the form is not filled out', async () => {
        const mockAddTodo = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={mockAddTodo} />);
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
            points: 5,
            assignee: "Test Person"
        }
        const user = userEvent.setup();
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={mockAddTodo}/>);
        await user.type(screen.getByRole("textbox", { name: "Name"}), testTodo.name);
        await user.type(screen.getByRole("textbox", { name: "Description"}), testTodo.description);
        await user.type(screen.getByRole("textbox", { name: "Assign to"}), testTodo.assignee);
        await user.type(screen.getByRole("spinbutton", { name: "Points"}), testTodo.points.toString());
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodo).toHaveBeenCalledWith(testTodo);
    });

    it('should render form with values if editing todo', () => {
        const testTodo = {
            "id": 1,
            "name": "Test Todo",
            "description": "Test Description",
            "status": "incomplete",
            "points": 5,
            assignee: "Test Person"
        }
        render(<TodoDialog handleClose={vi.fn()} editTodo={vi.fn()} addTodo={vi.fn()} todoToEdit={testTodo as Todo} />);
        expect(screen.getByRole("textbox", { name: "Name"})).toHaveValue(testTodo.name);
        expect(screen.getByRole("textbox", { name: "Description"})).toHaveValue(testTodo.description);
        expect(screen.getByRole("textbox", { name: "Assign to"})).toHaveValue(testTodo.assignee);
        expect(screen.getByRole("spinbutton", { name: "Points"})).toHaveValue(testTodo.points);
    });

    it('should call edit todo when values change and form is submitted', async () => {
        const testTodo = {
            id: 1,
            name: "Test Todo",
            description: "Test Description",
            status: "incomplete",
            points: 5,
            assignee: "Test Person"
        }
        const mockedEdit = vi.fn()
        render(<TodoDialog handleClose={vi.fn()}  addTodo={vi.fn()} editTodo={mockedEdit} todoToEdit={testTodo as Todo} />);
        const user = userEvent.setup();
        const nameInput = screen.getByRole("textbox", { name: "Name"});
        await user.clear(nameInput)
        await user.type(nameInput, "New Name");
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockedEdit).toHaveBeenCalledWith({ ...testTodo, name: "New Name" });
    });

    it('should call neither save or edit if no changes are made', async () => {
        const testTodo = {
            id: 1,
            name: "Test Todo",
            description: "Test Description",
            status: "incomplete",
            points: 5,
            assignee: "Test Person"
        }
        const mockedEdit = vi.fn();
        const mockedAdd = vi.fn();
        render(<TodoDialog handleClose={vi.fn()}  addTodo={mockedAdd} editTodo={mockedEdit} todoToEdit={testTodo as Todo} />);
        const user = userEvent.setup();
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockedAdd).toHaveBeenCalledTimes(0);
        expect(mockedEdit).toHaveBeenCalledTimes(0);
    })
})