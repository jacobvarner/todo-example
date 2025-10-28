package com.bridge.todo.todoList;

import com.bridge.todo.todo.Todo;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "todo_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TodoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "listId")
    private List<Todo> todos = List.of();

    public TodoList(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
