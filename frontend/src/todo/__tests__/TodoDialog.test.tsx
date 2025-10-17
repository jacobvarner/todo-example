import {TodoDialog} from "../TodoDialog.tsx";
import {render, screen} from "@testing-library/react";
import {expect, describe} from "vitest";
import {userEvent} from "@testing-library/user-event";

describe('TodoDialog', () => {
    it('should have a title', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("heading", { name: "Add New Todo"})).toBeVisible();
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Name"})).toBeVisible()
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Description"})).toBeVisible()
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("spinbutton", { name: "Points"})).toBeVisible()
    })

    it('should have a text input for name', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("textbox", { name: "Assign to"})).toBeVisible()
    })

    it('should have a close button', () => {
        render(<TodoDialog handleClose={vi.fn()}/>);
        expect(screen.getByRole("button", { name: "Close"})).toBeVisible();
    })

    it('should call "handleClose" when close button is clicked', async () => {
        const mockHandleClose = vi.fn();
        const user = userEvent.setup();
        render(<TodoDialog handleClose={mockHandleClose}/>);
        await user.click(screen.getByRole("button", { name: "Close"}));
        expect(mockHandleClose).toHaveBeenCalled();
    })
})