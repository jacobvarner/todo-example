import * as HomePage from "../pages/HomePage";
import * as ArchivePage from "../pages/ArchivePage";
import * as TodoPage from "../pages/TodoPage";
import * as ReactRouter from 'react-router';
import {MemoryRouter, useParams} from "react-router";
import {render, screen} from "@testing-library/react";
import {ApplicationRoutes} from "../ApplicationRoutes.tsx";

describe('Application Routes', () => {
    it('should render HomePage at home route', async () => {
        vi.spyOn(HomePage, 'HomePage').mockReturnValue(<p>This is the Home page.</p>);
        render(
            <MemoryRouter initialEntries={['/']}>
                <ApplicationRoutes />
            </MemoryRouter>
        )
        expect(await screen.findByText("This is the Home page.")).toBeVisible();
    });

    it('should render the ArchivePage at /archive', async () => {
        vi.spyOn(ArchivePage, 'ArchivePage').mockReturnValue(<p>This is the Archive page.</p>);
        render(
            <MemoryRouter initialEntries={['/archive']}>
                <ApplicationRoutes />
            </MemoryRouter>
        )
        expect(await screen.findByText("This is the Archive page.")).toBeVisible();
    })

    it.each([1, 2, 3])('should render the Todo page for /todo-list/%d', async (id) => {

        vi.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: id})
        const MockTodoPage = () => {
            const {id} = useParams();
            return <p>This is the todo page for {id}</p>
        }

        vi.spyOn(TodoPage, 'TodoPage').mockReturnValue(MockTodoPage());
        render(
            <MemoryRouter initialEntries={['/todo-list/' + id]}>
                <ApplicationRoutes />
            </MemoryRouter>
        )
        expect(await screen.findByText("This is the todo page for " + id)).toBeVisible();
    })
})