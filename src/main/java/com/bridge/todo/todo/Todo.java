package com.bridge.todo.todo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "todo")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
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

    public Todo(String name) {
        this.name = name;
    }
}
