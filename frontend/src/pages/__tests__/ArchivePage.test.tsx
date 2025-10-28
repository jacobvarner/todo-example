import {render, within, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {act} from "react";
import * as TodoClient from "../../todo/TodoClient.ts";
import {ArchivePage} from "../ArchivePage.tsx";

describe('Archive Page', () => {
    vi.spyOn(TodoClient, 'getTodos').mockResolvedValue([]);

    it('should display the title', async () => {
        render(<ArchivePage/>)
        expect(screen.getByRole("heading", {name: /archived todos/i})).toBeVisible()
    })

    it('should only show archived todos', async () => {
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce(
            [
                {id: 1, name: "test 1", status: "incomplete"},
                {id: 2, name: "test 2", status: "complete"},
                {id: 3, name: "test 3", status: "archived"}
            ]
        );
        render(<ArchivePage/>);
        expect(await screen.findByRole("listitem", { name: "test 3"})).toBeVisible();
        expect(screen.queryByRole("listitem", { name: "test 1"})).toBeNull();
        expect(screen.queryByRole("listitem", { name: "test 2"})).toBeNull();
    })

    it('should restore a todo when clicked', async () => {
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "archived"}]);
        const toggleSpy = vi.spyOn(TodoClient, 'toggleArchive').mockResolvedValueOnce(200);
        render(<ArchivePage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const restoreButton = within(todo).getByRole("button", {name: "Restore"});
        await act(async () => {
            await user.click(restoreButton);
        })
        expect(toggleSpy).toHaveBeenCalledWith(1);
        expect(screen.queryByRole("listitem", { name: "test 1"})).toBeNull();
    })

    it('should not restore when client returns 404', async () => {
        vi.spyOn(TodoClient, 'getTodos').mockResolvedValueOnce([{id: 1, name: "test 1", status: "archived"}]);
        const toggleSpy = vi.spyOn(TodoClient, 'toggleArchive').mockResolvedValueOnce(404);
        render(<ArchivePage/>);
        const user = userEvent.setup();
        const todo = await screen.findByRole("listitem", {name: "test 1"});
        const restoreButton = within(todo).getByRole("button", {name: "Restore"});
        await act(async () => {
            await user.click(restoreButton);
        })
        expect(todo).toBeVisible();
        expect(toggleSpy).toHaveBeenCalledWith(1);
    });

})