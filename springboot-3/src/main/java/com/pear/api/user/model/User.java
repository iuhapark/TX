package com.pear.api.user.model;

import com.pear.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Component
@Getter
@Setter
@Builder(toBuilder = true)
@ToString(exclude = {"id"})
public class User extends BaseEntity {
    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String job;
    private String token;
}
