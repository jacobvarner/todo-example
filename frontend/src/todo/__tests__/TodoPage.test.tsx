import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import TodoPage from "../TodoPage.tsx";

describe('Todo Page', () => {
    it('should display the title', async () => {
        render(<TodoPage/>)
        expect(screen.getByRole("heading", {name: /my/i})).toBeInTheDocument()
    })
})