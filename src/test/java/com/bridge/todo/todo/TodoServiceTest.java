package com.bridge.todo.todo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    TodoRepository mockTodoRepository;

    @InjectMocks
    TodoService todoService;

    @Test
    void getAllTodos_shouldCallRepository() {
        todoService.getAllTodos();

        verify(mockTodoRepository, times(1)).findAll();
    }

    @Test
    void getAllTodos_shouldReturnListOfTodos() {
        List<Todo> testListOfTodos = List.of(
                new Todo(1, "test 1"),
                new Todo(2, "test 2")
        );
        when(mockTodoRepository.findAll()).thenReturn(testListOfTodos);

        List<Todo> result = todoService.getAllTodos();

        assertEquals(result, testListOfTodos);
    }

}