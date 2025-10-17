package com.bridge.todo.todo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/todo")
public class TodoController {

    public TodoController() {}

    @GetMapping
    public String fetchToDos(){
        return "Todo";
    }
}
