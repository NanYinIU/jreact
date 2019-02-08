package com.nanyin.jreact.service.serviceImpl;

import com.nanyin.jreact.config.security.JwtTokenUtil;
import com.nanyin.jreact.config.security.SecurityCommonService;
import com.nanyin.jreact.entry.Role;
import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.repository.UserRepository;
import com.nanyin.jreact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private JwtTokenUtil jwtTokenUtil;
    private AuthenticationManager authenticationManager;
    private SecurityCommonService securityCommonService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, JwtTokenUtil jwtTokenUtil,
                           AuthenticationManager authenticationManager, SecurityCommonService securityCommonService) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
        this.securityCommonService = securityCommonService;
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String name) {
        return userRepository.findUserByUsername(name);
    }

    @Override
    public String login(String username, String password) {
        UsernamePasswordAuthenticationToken upToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(upToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = securityCommonService.loadUserByUsername(username);
        return jwtTokenUtil.generateToken(userDetails);
    }

    @Override
    public String register(User user) {
        String username = user.getUsername();
        if (userRepository.findUserByUsername(username) != null) {
            return "用户已存在";
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = user.getPassword();
        user.setPassword(encoder.encode(rawPassword));
        List<Role> roles = new ArrayList<>();
        roles.add(new Role("ROLE_USER"));
        user.setRoles(roles);
        userRepository.save(user);
        return "success";
    }


}
