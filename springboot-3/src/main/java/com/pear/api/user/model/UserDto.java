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
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String job;
    private String regDate;
    private String modDate;
    private String token;
    private Long balance = 0L;
}
