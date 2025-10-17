package com.bridge.todo.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    public TodoService() {};

    public List<Todo> getAllTodos() {
        return List.of();
    }
}
