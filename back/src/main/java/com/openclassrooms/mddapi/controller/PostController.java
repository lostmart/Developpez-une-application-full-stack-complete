package com.openclassrooms.mddapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.access.prepost.PreAuthorize;

/*
 * Controller that handles post operations
 */

@PreAuthorize("hasRole('USER')")
@RestController
@RequestMapping("/api/posts")

public class PostController {

    @GetMapping(value = { "", "/" })
    public String getAllPosts() {
        return new String("Hello all posts");
    }

}
