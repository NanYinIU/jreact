package com.nanyin.jreact.config.security;

import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class SecurityCommonService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userService.findUserByUsername(userName);
        if (user == null){
            throw new UsernameNotFoundException("用户不存在！");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),
                user.getRoles());
    }


}
