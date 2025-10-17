package com.bridge.todo.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoController.class)
public class TodoControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @MockitoBean
    TodoService mockTodoService;

    @Test
    void shouldAcceptGetRequestForAllTodos() throws Exception {
        mvc.perform(get("/api/todo")).andExpect(status().isOk());
    }

    @Test
    void shouldCallGetTodosFromTodoServiceForGetRequest() throws Exception {
        mvc.perform(get("/api/todo"));
        verify(mockTodoService, times(1)).getAllTodos();
    }

    @Test
    void shouldReturnListOfTodosFromServiceForGetRequest() throws Exception {
        List<Todo> testListOfTodos = List.of(new Todo(1, "test 1"), new Todo(2, "test 2"));
        when(mockTodoService.getAllTodos()).thenReturn(testListOfTodos);
        mvc.perform(get("/api/todo")).andExpect(content().json(mapper.writeValueAsString(testListOfTodos)));
    }
}