package com.bridge.todo.todoList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/todo-list")
public class TodoListController {
    private final TodoListService todoListService;

    public TodoListController(TodoListService todoListService) {
        this.todoListService = todoListService;
    }

    @GetMapping
    public ResponseEntity<List<TodoList>> getAll() {
        List<TodoList> todoLists = todoListService.getAllTodoLists();
        return ResponseEntity.ok(todoLists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoList> getById(@PathVariable Integer id) {
        try {
            TodoList todoList = todoListService.getById(id);
            return ResponseEntity.ok(todoList);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<TodoList> addTodo(@RequestBody TodoList newTodoList) {
        TodoList createdTodoList = todoListService.addTodoList(newTodoList);
        return new ResponseEntity<>(createdTodoList, HttpStatus.CREATED);
    }
}
