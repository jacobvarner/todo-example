import {render, screen} from "@testing-library/react";
import {describe, expect} from "vitest";
import {userEvent} from "@testing-library/user-event";
import {TodoListDialog} from "../TodoListDialog.tsx";

describe('TodoListDialog', () => {
    it('should have a title', () => {
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={vi.fn()}/>);
        expect(screen.getByRole("heading", { name: "Add New Todo List"})).toBeVisible();
    })

    it('should have a text input for name', () => {
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Name"})).toBeVisible()
    })

    it('should have a text input for description', () => {
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Description"})).toBeVisible()
    })

    it('should have a close button', () => {
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={vi.fn()}/>);
        expect(screen.getByRole("button", { name: "Close"})).toBeVisible();
    })

    it('should call "handleClose" when close button is clicked', async () => {
        const mockHandleClose = vi.fn();
        const user = userEvent.setup();
        render(<TodoListDialog handleClose={mockHandleClose} addTodoList={vi.fn()}/>);
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(mockHandleClose).toHaveBeenCalled();
    })

    it('should call "addTodoList" when submit button is clicked', async () => {
        const mockAddTodoList = vi.fn();
        const user = userEvent.setup();
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={mockAddTodoList} />);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodoList).toHaveBeenCalled();
    })

    it('should call "addTodoList" with default values when the form is not filled out', async () => {
        const mockAddTodoList = vi.fn();
        const user = userEvent.setup();
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={mockAddTodoList} />);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodoList).toHaveBeenCalledWith({
            name: "No Name",
            description: "No Description"
        });
    })

    it('should call "addTodoList" with filled out fields', async () => {
        const mockAddTodoList = vi.fn();
        const testTodoList = {
            name: "Test Todo",
            description: "Test Description"
        }
        const user = userEvent.setup();
        render(<TodoListDialog handleClose={vi.fn()} addTodoList={mockAddTodoList}/>);
        await user.type(screen.getByRole("textbox", { name: "Name"}), testTodoList.name);
        await user.type(screen.getByRole("textbox", { name: "Description"}), testTodoList.description);
        await user.click(screen.getByRole("button", { name: "Submit"}));
        expect(mockAddTodoList).toHaveBeenCalledWith(testTodoList);
    });
})