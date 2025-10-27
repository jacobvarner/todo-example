package com.bridge.todo.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

    @Nested
    class getAll {
        @Test
        void shouldAcceptGetRequest() throws Exception {
            mvc.perform(get("/api/todo")).andExpect(status().isOk());
        }

        @Test
        void shouldCallTodoService() throws Exception {
            mvc.perform(get("/api/todo"));
            verify(mockTodoService, times(1)).getAllTodos();
        }

        @Test
        void shouldReturnListOfTodos() throws Exception {
            List<Todo> testListOfTodos = List.of(new Todo(1, "test 1"), new Todo(2, "test 2"));
            when(mockTodoService.getAllTodos()).thenReturn(testListOfTodos);
            mvc.perform(get("/api/todo")).andExpect(content().json(mapper.writeValueAsString(testListOfTodos)));
        }
    }

    @Nested
    class addTodo {
        @Test
        void shouldAcceptPostRequest() throws Exception {
            Todo testTodo = new Todo("test 1");
            mvc.perform(post("/api/todo")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testTodo)))
                .andExpect(status().isCreated());
        }

        @Test
        void shouldCallTodoServiceWithNewTodo() throws Exception {
            Todo testTodo = new Todo("test 1");
            mvc.perform(post("/api/todo")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testTodo)));

            verify(mockTodoService, times(1)).addTodo(testTodo);
        }

        @Test
        void shouldReturnCreatedTodoFromTodoService() throws Exception {
            Todo newTestTodo = new Todo("test 1");
            Todo createdTestTodo = new Todo(1, "test 1");
            when(mockTodoService.addTodo(newTestTodo)).thenReturn(createdTestTodo);

            mvc.perform(post("/api/todo")
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(newTestTodo)))
                    .andExpect(content().json(mapper.writeValueAsString(createdTestTodo)));

        }
    }

    @Nested
    class toggleStatus {
        @Test
        void shouldAcceptPatchRequest() throws Exception {
            mvc.perform(patch("/api/todo/" + 14)).andExpect(status().isOk());
        }

        @Test
        void shouldCallTodoService() throws Exception {
            Integer todoId = 14;
            mvc.perform(patch("/api/todo/" + todoId));
            verify(mockTodoService, times(1)).toggleStatus(todoId);
        }

        @Test
        void shouldReturnNotFoundWhenServiceThrowsANotFoundException() throws Exception {
            Integer nonExistentTodoId = 17;
            doThrow(new NoSuchElementException()).when(mockTodoService).toggleStatus(nonExistentTodoId);
            mvc.perform(patch("/api/todo/" + nonExistentTodoId)).andExpect(status().isNotFound());
        }
    }

    @Nested
    class editTodo {
        @Test
        void shouldAcceptPostRequest() throws Exception {
            Todo testTodo = new Todo(23, "test 1");
            mvc.perform(post("/api/todo/" + testTodo.getId())
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(testTodo)))
                    .andExpect(status().isOk());
        }

        @Test
        void shouldCallTodoService() throws Exception {
            Todo testTodo = new Todo(23, "test 1");
            mvc.perform(post("/api/todo/" + testTodo.getId())
                            .contentType(APPLICATION_JSON)
                            .content(mapper.writeValueAsString(testTodo)));
            verify(mockTodoService, times(1)).updateTodo(testTodo);
        }

        @Test
        void shouldReturnNotFoundWhenServiceThrowsANotFoundException() throws Exception {
            Todo testTodo = new Todo(23, "test 1");
            doThrow(new NoSuchElementException()).when(mockTodoService).updateTodo(testTodo);
            mvc.perform(post("/api/todo/" + testTodo.getId())
                    .contentType(APPLICATION_JSON)
                    .content(mapper.writeValueAsString(testTodo)))
                    .andExpect(status().isNotFound());
        }
    }



}