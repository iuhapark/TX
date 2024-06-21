package com.pear.api.user.model;

import lombok.*;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@AllArgsConstructor
@Component
@Data
@Builder
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private String phone;
    private String age;
    private String sex;
    private String regDate;
    private String modDate;
    private String token;
    private Long point;
    private String password;
    private Long balance = 0L;
}
