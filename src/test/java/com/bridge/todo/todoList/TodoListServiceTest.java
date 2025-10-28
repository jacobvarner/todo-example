package com.bridge.todo.todoList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TodoListServiceTest {

    @InjectMocks
    TodoListService todoListService;

    @Mock
    TodoListRepository mockTodoListRepository;

    @Test
    void getAllTodoLists_shouldCallRepository() {
        todoListService.getAllTodoLists();

        verify(mockTodoListRepository, times(1)).findAll();
    }

    @Test
    void getAllTodoLists_shouldReturnListOfTodoLists() {
        List<TodoList> testListOfTodoLists = List.of(
                new TodoList(1, "test 1", "test 1 description", List.of()),
                new TodoList(2, "test 2", "test 2 description", List.of())
        );
        when(mockTodoListRepository.findAll()).thenReturn(testListOfTodoLists);

        List<TodoList> result = todoListService.getAllTodoLists();

        assertEquals(testListOfTodoLists, result);
    }

    @Test
    void getById_shouldCallRepository() {
        when(mockTodoListRepository.findById(23)).thenReturn(Optional.of(new TodoList(1, "test 1", "test 1 description", List.of())));
        todoListService.getById(23);

        verify(mockTodoListRepository, times(1)).findById(23);
    }

    @Test
    void getById_shouldReturnTodoList() {
        TodoList testTodoList = new TodoList(1, "test 1", "test 1 description", List.of());
        when(mockTodoListRepository.findById(1)).thenReturn(Optional.of(testTodoList));

        TodoList result = todoListService.getById(1);

        assertEquals(testTodoList, result);
    }

    @Test
    void addTodoList_shouldCallRepository() {
        TodoList testTodoList = new TodoList("test 1", "test 1 description");
        todoListService.addTodoList(testTodoList);

        verify(mockTodoListRepository, times(1)).save(testTodoList);
    }

    @Test
    void addTodoList_shouldReturnTheCreatedTodoList() {
        TodoList newTestTodoList = new TodoList("test 1", "test 1 description");
        TodoList createdTestTodoList = new TodoList(1, "test 1", "test 1 description", List.of());
        when(mockTodoListRepository.save(newTestTodoList)).thenReturn(createdTestTodoList);

        TodoList result = todoListService.addTodoList(newTestTodoList);
        assertEquals(createdTestTodoList, result);
    }
}
