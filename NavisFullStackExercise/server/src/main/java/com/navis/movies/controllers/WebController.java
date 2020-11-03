package com.navis.movies.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping("/")
    public String index() {
        return "index"; 
    }

    @RequestMapping("/search")
    public String indexSearch() {
        return "index";
    }
}


