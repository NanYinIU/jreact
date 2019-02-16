package com.nanyin.jreact.config;

import com.nanyin.jreact.config.security.JwtAuthenticationTokenFilter;
import com.nanyin.jreact.config.security.RestAccessDeniedHandler;
import com.nanyin.jreact.config.security.RestAuthenticationEntryPoint;
import com.nanyin.jreact.config.security.SecurityCommonService;
import com.nanyin.jreact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(1000)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserRepository userRepository;

    private SecurityCommonService securityCommonService;
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
    private RestAccessDeniedHandler restAccessDeniedHandler;
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    @Autowired
    WebSecurityConfig(SecurityCommonService securityCommonService,
                      JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter,
                      RestAccessDeniedHandler restAccessDeniedHandler,
                      RestAuthenticationEntryPoint restAuthenticationEntryPoint){
        this.securityCommonService = securityCommonService;
        this.jwtAuthenticationTokenFilter = jwtAuthenticationTokenFilter;
        this.restAccessDeniedHandler=restAccessDeniedHandler;
        this.restAuthenticationEntryPoint=restAuthenticationEntryPoint;
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/user/register", "/user/login","/session/invalid","/user/validateUsername").permitAll()
                .anyRequest().authenticated();
//                .and()
//                .sessionManagement().invalidSessionUrl("/user/session/invalid");
//                .and()
//                .formLogin()
//                .loginPage("/user/login")
//                .permitAll()
//                .and()
//                .logout()
//                .permitAll();

        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).accessDeniedHandler(restAccessDeniedHandler);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder builder) throws Exception{
            builder.authenticationProvider(authenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider
                = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(securityCommonService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * 密码加密
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Override
    @Bean
    public UserDetailsService userDetailsServiceBean() throws Exception {
        return new SecurityCommonService(userRepository);
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
