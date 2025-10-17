export type Todo = {
    id: number,
    name: string,
    description: string,
    status: "complete" | "incomplete",
    points: number,
    assignee?: string
}