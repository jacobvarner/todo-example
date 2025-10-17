package com.bridge.todo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    public TestController() {}

    @GetMapping
    public String test(){
        return "This is a test";
    }
}
