package com.nanyin.jreact.service;

import com.nanyin.jreact.controller.UserController;
import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface UserService {
    void save(User user);

    User findUserByUsername(String name);
}
