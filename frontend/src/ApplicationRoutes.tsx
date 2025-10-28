import {Route, Routes} from "react-router";
import {ArchivePage} from "./pages/ArchivePage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {TodoPage} from "./pages/TodoPage.tsx";

export const ApplicationRoutes = () => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo-list/:id" element={<TodoPage/>} />
        <Route path="/archive" element={<ArchivePage/>} />
    </Routes>
}