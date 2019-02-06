package com.nanyin.jreact.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class UserController {
    @RequestMapping(path = "/api/hello",method = RequestMethod.GET)
    public String hello(){
        return "hello world " + new Date();
    }
}
