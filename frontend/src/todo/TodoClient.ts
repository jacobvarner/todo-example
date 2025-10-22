import axios from "axios";

export const getTodos = async () => {
    const result = await axios.get('/api/todo');
    return result.data;
}