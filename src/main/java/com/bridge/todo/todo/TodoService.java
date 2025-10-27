package com.bridge.todo.todo;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    };

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo addTodo(Todo todoToAdd) {
        return todoRepository.save(todoToAdd);
    }

    public void toggleStatus(Integer todoId) throws NoSuchElementException {
        Todo currentTodo = todoRepository.findById(todoId).orElseThrow();
        if (currentTodo.getStatus().equals("incomplete")) {
            currentTodo.setStatus("complete");
        } else {
            currentTodo.setStatus("incomplete");
        }
        todoRepository.save(currentTodo);
    }
}
