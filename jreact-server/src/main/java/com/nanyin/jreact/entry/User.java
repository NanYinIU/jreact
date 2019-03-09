package com.nanyin.jreact.entry;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;

/**
 * User实体类
 */
@Entity
@Data
@ToString(exclude = "password")
@Table(name = "user",uniqueConstraints = {@UniqueConstraint(columnNames = "username")}
,indexes = {@Index(columnList = "username")})
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username",nullable = true,length = 255)
    private String username;

    @JsonIgnore
    @Column(name = "password",nullable = true,length = 255)
    private String password;

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "person_id",nullable = false,referencedColumnName = "id")
    private Person person;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE})
    @JoinTable(name = "r_user_role",
            joinColumns = @JoinColumn(name = "userId"),
            inverseJoinColumns = @JoinColumn(name = "roleId"))
    private List<Role> roles;

}

