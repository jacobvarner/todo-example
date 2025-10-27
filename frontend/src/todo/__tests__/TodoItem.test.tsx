import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {TodoItem} from "../TodoItem.tsx";
import type {Todo} from "../Todo.ts";

const testTodo: Todo = {
    id: 1,
    name: "Test Todo",
    description: "This is a placeholder todo for testing.",
    points: 5
}

describe('Todo Item', () => {
    it('should display a title for the todo', () => {
        render(<TodoItem todo={testTodo}/>);
        expect(screen.getByRole("heading", {name: testTodo.name})).toBeVisible();
    });

    it('should display a description for the todo', () => {
        render(<TodoItem todo={testTodo}/>);
        expect(screen.getByRole('paragraph', {name: "description"})).toHaveTextContent(testTodo.description!);
    })

    it('should display the point value if it is greater than 0', () => {
        render(<TodoItem todo={testTodo}/>);
        expect(screen.getByRole('paragraph', {name: "points value"})).toHaveTextContent(testTodo.points + " Points");
    })

    it('should not display the point value if it is worth 0 points', () => {
        render(<TodoItem todo={{...testTodo, points: 0}}/>);
        expect(screen.queryByRole("paragraph", { name: "points value"})).toBeNull();
    })

    it('should display the assignee if there is one', () => {
        render(<TodoItem todo={{...testTodo, assignee: "Person 1"}}/>);
        expect(screen.getByRole('paragraph', {name: "assignee"})).toHaveTextContent("Person 1");
    })

    it('should not display the assignee if there is not someone assigned', () => {
        render(<TodoItem todo={testTodo}/>);
        expect(screen.queryByRole("paragraph", { name: "assignee"})).toBeNull();
    })
});