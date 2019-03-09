package com.nanyin.jreact.login;

import com.nanyin.jreact.config.security.JwtProps;
import org.junit.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.SimpleDateFormat;
import java.util.Date;

public class EncodedTest {
    @Test
    public void testEncoded(){
        String before = "1";
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String after = encoder.encode(before);
        System.out.println(after);
    }

    @Test
    public void testDate(){
        Date expirationDate = new Date(System.currentTimeMillis() + 2592000L * 1000); //大概30天
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("YYYY-MM-dd hh:mm:ss");
        String st= simpleDateFormat.format(expirationDate);
        System.out.println(st);
    }

}
