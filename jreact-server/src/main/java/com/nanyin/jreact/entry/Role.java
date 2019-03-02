package com.nanyin.jreact.entry;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "role")
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name",nullable = false,length = 64)
    private String name;

    @Column(name = "ord")
    private Integer ord;

    @Column(name = "comment",length = 255)
    private String comment;

    // 在有循环调用的地方使用JsonIgnore来控制输出json
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    @Override
    public String getAuthority() {
        return name;
    }

    public Role(String name) {
        this.name = name;
    }

    public Role() {
    }
}
