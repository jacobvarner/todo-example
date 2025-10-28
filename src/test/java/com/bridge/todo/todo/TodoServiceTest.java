package com.bridge.todo.todo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

        assertEquals(testListOfTodos, result);
    }

    @Test
    void addTodo_shouldCallRepository() {
        Todo testTodo = new Todo("test 1");
        todoService.addTodo(testTodo);

        verify(mockTodoRepository, times(1)).save(testTodo);
    }

    @Test
    void addTodo_shouldReturnTheCreatedTodo() {
        Todo newTestTodo = new Todo("test 1");
        Todo createdTestTodo = new Todo(1, "test 1");
        when(mockTodoRepository.save(newTestTodo)).thenReturn(createdTestTodo);

        Todo result = todoService.addTodo(newTestTodo);
        assertEquals(createdTestTodo, result);
    }

    @Test
    void toggleStatus_shouldCallRepositoryToGetCurrentStatus() {
        Todo testTodo = new Todo(23, "test 1");
        when(mockTodoRepository.findById(23)).thenReturn(Optional.of(testTodo));
        todoService.toggleStatus(23);
        verify(mockTodoRepository, times(1)).findById(23);
    }

    @Test
    void toggleStatus_shouldThrowExceptionIfTodoDoesNotExist() {
        when(mockTodoRepository.findById(17)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> todoService.toggleStatus(17));
    }

    @ParameterizedTest
    @CsvSource({"incomplete,complete", "complete,incomplete"})
    void toggleStatus_shouldCallRepositoryWithOtherStatus(String initial, String updated) {
        Todo initialTodo = new Todo(58, "test 1", initial);
        Todo updatedTodo = new Todo(58, "test 1", updated);
        when(mockTodoRepository.findById(58)).thenReturn(Optional.of(initialTodo));
        todoService.toggleStatus(initialTodo.getId());
        verify(mockTodoRepository, times(1)).save(updatedTodo);
    }

    @Test
    void updateTodo_shouldCallRepositoryToGetCurrentTodo() {
        Todo testTodo = new Todo(14, "test 1");
        when(mockTodoRepository.findById(testTodo.getId())).thenReturn(Optional.of(testTodo));
        todoService.updateTodo(testTodo);
        verify(mockTodoRepository, times(1)).findById(testTodo.getId());
    }

    @Test
    void updateTodo_shouldThrowExceptionIfTodoDoesNotExist() {
        Todo testTodoThatDoesNotExist = new Todo(14, "test 1");
        when(mockTodoRepository.findById(testTodoThatDoesNotExist.getId())).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> todoService.updateTodo(testTodoThatDoesNotExist));
    }

    @Test
    void updateTodo_shouldCallRepositoryToSaveUpdatedTodo() {
        Todo initialTodo = new Todo(58, "test 1");
        Todo updatedTodo = new Todo(58, "updated test 1");
        when(mockTodoRepository.findById(initialTodo.getId())).thenReturn(Optional.of(initialTodo));
        todoService.updateTodo(updatedTodo);
        verify(mockTodoRepository, times(1)).save(updatedTodo);
    }

    @Test
    void toggleArchive_shouldCallRepositoryToGetCurrentStatus() {
        Todo testTodo = new Todo(42, "test 1");
        when(mockTodoRepository.findById(42)).thenReturn(Optional.of(testTodo));
        todoService.toggleArchive(42);
        verify(mockTodoRepository, times(1)).findById(42);
    }

    @Test
    void toggleArchive_shouldThrowExceptionIfTodoDoesNotExist() {
        when(mockTodoRepository.findById(15)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> todoService.toggleArchive(15));
    }

    @ParameterizedTest
    @CsvSource({"incomplete,archived", "complete,archived", "archived,incomplete"})
    void toggleArchive_shouldCallRepositoryWithArchiveOrStatus(String initial, String updated) {
        Todo initialTodo = new Todo(76, "test 1", initial);
        Todo updatedTodo = new Todo(76, "test 1", updated);
        when(mockTodoRepository.findById(76)).thenReturn(Optional.of(initialTodo));
        todoService.toggleArchive(initialTodo.getId());
        verify(mockTodoRepository, times(1)).save(updatedTodo);
    }

}