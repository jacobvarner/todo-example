package com.bridge.todo.todoList;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoListService {
    private final TodoListRepository todoListRepository;

    public TodoListService(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    public List<TodoList> getAllTodoLists() {
        return todoListRepository.findAll();
    }

    public TodoList getById(Integer id) throws NoSuchElementException {
        return todoListRepository.findById(id).orElseThrow();
    }

    public TodoList addTodoList(TodoList todoList) {
        return todoListRepository.save(todoList);
    }
}
