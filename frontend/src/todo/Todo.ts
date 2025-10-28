export type Todo = {
    id?: number,
    name: string,
    description?: string,
    status: "complete" | "incomplete" | "archived",
    points?: number,
    assignee?: string
}