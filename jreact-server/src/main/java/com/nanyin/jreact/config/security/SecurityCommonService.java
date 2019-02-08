package com.nanyin.jreact.config.security;

import com.nanyin.jreact.config.UserPrincipal;
import com.nanyin.jreact.entry.User;
import com.nanyin.jreact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class SecurityCommonService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public SecurityCommonService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(userName);
        if (user == null){
            throw new UsernameNotFoundException("用户不存在！");
        }
        return new UserPrincipal(user.getUsername(),user.getPassword(),
                user.getRoles());
    }


}
