package com.nanyin.jreact.config.security;

import lombok.Getter;

@Getter
public enum JwtProps {
    TOKEN_HEAD("Bearer "),
    AUTH_HEADER("Authorization"),
    SECRET("jreact");

    private String name;
    JwtProps(String name) {
        this.name = name;
    }

}
