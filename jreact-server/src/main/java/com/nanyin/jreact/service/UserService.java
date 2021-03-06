package com.nanyin.jreact.service;

import com.nanyin.jreact.entry.User;

public interface UserService {

    void save(User user);

    User findUserByUsername(String name);

    String login(String username,String password);

    Boolean register(User user);

    String findRoleString(String username);

}
