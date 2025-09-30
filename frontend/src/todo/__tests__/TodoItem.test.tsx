import {fireEvent, render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {TodoItem} from "../TodoItem.tsx";
import type {Todo} from "../Todo.ts";
import { vi } from 'vitest';
import {userEvent} from "@testing-library/user-event";

let feedDog: Todo;
let waterPlants: Todo;

describe('Todo Item', () => {
    beforeEach(() => {
        feedDog = {id: 1, name: "Feed dog", description: "Feed the dog at 5", status: "completed" };
        waterPlants = {id: 2, name: "Water plants", description: "Water the plants", status: "active" };
    });

    it('should display a single item', async () => {
        render(<TodoItem todoTask={feedDog} />)
        const listItem = screen.getByRole("listitem");
        const itemName = listItem.children.namedItem(feedDog.name);
        expect(itemName.textContent).toBe("Feed dog");
    })

    it('should be another way to test single item', () => {
        render(<TodoItem todoTask={feedDog} />)
        const listItem = screen.getByRole("listitem");
        expect(listItem.textContent).toContain(feedDog.name);
    })

    it('should not have the status checked', () => {
        render(<TodoItem todoTask={waterPlants} />)
        expect(screen.getByRole('checkbox', { name: /status/i})).toBeInTheDocument();
        const handleChange = vi.fn();
        const statusCheckbox = screen.getByRole('checkbox', {name: /status/i});

        expect(statusCheckbox).not.toBeChecked();
        expect(handleChange).toHaveBeenCalledTimes(0);
    });

    it('should change the status of the task on click', async () => {
        render(<TodoItem todoTask={waterPlants} />)
        const handleChange = vi.fn();
        const statusCheckbox = screen.getByRole('checkbox', {name: /status/i});
        expect(statusCheckbox).toBeInTheDocument();
        //fireEvent.click(statusCheckbox);
        await userEvent.click(statusCheckbox);
        expect(statusCheckbox).toBeChecked();
        expect(handleChange).toHaveBeenCalledTimes(1);
    })

})