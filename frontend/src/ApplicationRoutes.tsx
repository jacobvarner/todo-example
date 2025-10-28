import {TodoPage} from "./pages/TodoPage.tsx";
import {Route, Routes} from "react-router";
import {ArchivePage} from "./pages/ArchivePage.tsx";

export const ApplicationRoutes = () => {
    return <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/archive" element={<ArchivePage/>} />
    </Routes>
}