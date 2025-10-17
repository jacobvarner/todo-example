package com.bridge.todo.todo;

import jakarta.persistence.*;

@Entity
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Integer points;
    private String assignee;

    public Todo(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
}
