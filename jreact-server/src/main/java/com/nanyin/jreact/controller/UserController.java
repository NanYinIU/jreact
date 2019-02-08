package com.nanyin.jreact.controller;

import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/user")
public class UserController {
//    @GetMapping(path = "/api/hello",method = RequestMethod.GET)
//    public String hello(){
//        return "hello world " + new Date();
//    }

    @Autowired
    UserService userService;

    @GetMapping(path = "/login",params = {"username", "password"})
    public String login(String username,String password){
        return userService.login(username, password);
    }

    @PostMapping(value = "/register",params = "user")
    public String register(User user) throws AuthenticationException {
        return userService.register(user);
    }
}
