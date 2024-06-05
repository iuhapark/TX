package com.pear.api.user.model;

import com.pear.api.common.model.BaseEntity;
import com.pear.api.order.model.Order;
import com.pear.api.post.model.Post;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Component
@Getter
@Builder(toBuilder = true)
@ToString(exclude = {"id"})
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // database will generate the id
    private Long id;
    private String username;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String job;
    private String token;
    private Long balance = 0L;

    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany
    private List<Order> orders;
}
