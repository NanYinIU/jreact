package com.nanyin.jreact.controller;

import com.alibaba.fastjson.JSONObject;
import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(path = "/login",params = {"username", "password"})
    public ResponseEntity<Object> login(String username, String password){
        JSONObject jsonObject = new JSONObject();
        try{
            String token = userService.login(username, password);
            jsonObject.put("Authorization",token);
            jsonObject.put("success",true);
            jsonObject.put("user",userService.findUserByUsername(username));
            return ResponseEntity.ok().header("Authorization",token).body(jsonObject);
        }catch (Exception e){
            jsonObject.put("message","登录出现错误");
            jsonObject.put("success",false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObject);
        }
    }

    @PostMapping(path = "/register",params = "user")
    public ResponseEntity<Object> register(User user) {
        JSONObject jsonObject = new JSONObject();
        try{
            Boolean status = userService.register(user);
            if(status){
                jsonObject.put("success",true);
                return ResponseEntity.status(HttpStatus.OK).
                        header(userService.login(user.getUsername(), user.getPassword())).
                        body(jsonObject);
            }else{
                jsonObject.put("success",false);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
            }
        }catch (Exception e){
            e.printStackTrace();
            jsonObject.put("success",false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        }
    }

    @GetMapping(path = "/validateUsername")
    public Object validateUsername(@RequestParam(name = "username") String username){
            JSONObject jsonObject = new JSONObject();
        try{
            User user = userService.findUserByUsername(username);
            if(user != null){
//                jsonObject.put("user",user);
                jsonObject.put("success",true);
            }else{
                jsonObject.put("success",false);
            }
        }catch (Exception e){
            jsonObject.put("success",false);
        }
        return jsonObject;
    }

}
