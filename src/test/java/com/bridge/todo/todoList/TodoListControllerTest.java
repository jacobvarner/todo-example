package com.bridge.todo.todoList;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoListController.class)
public class TodoListControllerTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper mapper;

    @MockitoBean
    TodoListService mockTodoListService;

    @Nested
    class getAll {
        @Test
        void shouldAcceptGetRequest() throws Exception {
            mvc.perform(get("/api/todo-list")).andExpect(status().isOk());
        }

        @Test
        void shouldCallTodoListService() throws Exception {
            mvc.perform(get("/api/todo-list"));
            verify(mockTodoListService, times(1)).getAllTodoLists();
        }

        @Test
        void shouldReturnListOfTodos() throws Exception {
            List<TodoList> testListOfTodoLists = List.of(new TodoList(1, "test 1", "t1 description", List.of()), new TodoList(2, "test 2", "t2 description", List.of()));
            when(mockTodoListService.getAllTodoLists()).thenReturn(testListOfTodoLists);
            mvc.perform(get("/api/todo-list")).andExpect(content().json(mapper.writeValueAsString(testListOfTodoLists)));
        }
    }

    @Nested
    class getById {
        @Test
        void shouldAcceptGetRequest() throws Exception {
            mvc.perform(get("/api/todo-list/23")).andExpect(status().isOk());
        }

        @Test
        void shouldCallTodoListService() throws Exception {
            mvc.perform(get("/api/todo-list/23"));
            verify(mockTodoListService, times(1)).getById(23);
        }

        @Test
        void shouldTodoList() throws Exception {
            TodoList testTodoList= new TodoList(1, "test 1", "t1 description", List.of());
            when(mockTodoListService.getById(1)).thenReturn(testTodoList);
            mvc.perform(get("/api/todo-list/1")).andExpect(content().json(mapper.writeValueAsString(testTodoList)));
        }
    }

    @Nested
    class addTodoList {
        @Test
        void shouldAcceptPostRequest() throws Exception {
            TodoList testTodoList = new TodoList("test 1", "test 1 description");
            mvc.perform(post("/api/todo-list")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testTodoList)))
                .andExpect(status().isCreated());
        }

        @Test
        void shouldCallTodoListServiceWithNewTodoList() throws Exception {
            TodoList testTodoList = new TodoList("test 1", "test 1 description");
            mvc.perform(post("/api/todo-list")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testTodoList)));

            verify(mockTodoListService, times(1)).addTodoList(testTodoList);
        }

        @Test
        void shouldReturnCreatedTodoListFromTodoListService() throws Exception {
            TodoList newTestTodoList = new TodoList("test 1", "test 1 description");
            TodoList createdTestTodoList = new TodoList(1, "test 1", "test 1 description", List.of());
            when(mockTodoListService.addTodoList(newTestTodoList)).thenReturn(createdTestTodoList);

            mvc.perform(post("/api/todo-list")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(newTestTodoList)))
                    .andExpect(content().json(mapper.writeValueAsString(createdTestTodoList)));

        }
    }
}