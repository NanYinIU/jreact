package com.nanyin.jreact.entry;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

@Entity
@Data
@Table(name = "person")
public class Person {

    @Id
    private long id;
    @Column(name = "name",length = 128)
    private String name;

    @Column(name = "age",length = 3)
    private short age;

    @Column(name = "comment",length = 255)
    private String comment;

    @Column(name = "email",length = 64)
    @Email
    private String email;

    @Column(name = "phone",length = 32)
    private String phone;

    @Column(name = "head",length = 64)
    private String head;

}
