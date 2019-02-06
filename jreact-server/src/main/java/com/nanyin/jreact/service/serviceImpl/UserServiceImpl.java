package com.nanyin.jreact.service.serviceImpl;

import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.repository.UserRepository;
import com.nanyin.jreact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String name) {
        return userRepository.findUserByUsername(name);
    }


}
