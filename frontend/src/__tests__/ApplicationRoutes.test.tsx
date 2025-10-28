import * as TodoPage from "../pages/TodoPage";
import * as ArchivePage from "../pages/ArchivePage";
import {MemoryRouter} from "react-router";
import {render, screen} from "@testing-library/react";
import {ApplicationRoutes} from "../ApplicationRoutes.tsx";

describe('Application Routes', () => {
    it('should render TodoPage at home route', async () => {
        vi.spyOn(TodoPage, 'TodoPage').mockReturnValue(<p>This is the Todo page.</p>);
        render(
            <MemoryRouter initialEntries={['/']}>
                <ApplicationRoutes />
            </MemoryRouter>
        )
        expect(await screen.findByText("This is the Todo page.")).toBeVisible();
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
})