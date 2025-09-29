import {render, screen } from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {TodoItem} from "../TodoItem.tsx";
import type {Todo} from "../Todo.ts";

describe('Todo Item', () => {
    it('should display a single item', async () => {
        const feedDog: Todo = {id: 1, name: "Feed dog", description: "Feed the dog at 5", status: "done" };
        render(<TodoItem todoTask={feedDog} />)
        const listItem = screen.getByRole("listitem");

        expect(listItem.textContent).toBe("Feed dog");
    })

    it('should display ', async () => {
        const newTodo: Todo = {id: 1, name: "Water plants=", description: "Water  plants at 6", status: "done" };
        render(<TodoItem todoTask={newTodo} />)
        const listItem = screen.getByRole("listitem");
        expect(listItem.textContent).toContain(newTodo.name);
        screen.logTestingPlaygroundURL()
    })
})