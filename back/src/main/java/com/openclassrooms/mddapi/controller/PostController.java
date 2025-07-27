package com.openclassrooms.mddapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * Controller that handles post operations
 */

@RestController
@RequestMapping("/api/posts")

public class PostController {

    @GetMapping("/")
    public String getAllPosts(@RequestParam String param) {
        return new String("Hello all posts");
    }

}
