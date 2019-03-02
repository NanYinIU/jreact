package com.nanyin.jreact.login;

import com.nanyin.jreact.config.security.JwtProps;
import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncodedTest {
    @Test
    public void testEncoded(){
        String before = "1";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String after = encoder.encode(before);
        System.out.println(after);
    }
}
