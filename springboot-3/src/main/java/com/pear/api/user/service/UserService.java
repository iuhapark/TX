package com.pear.api.user.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.user.model.User;
import com.pear.api.user.model.UserDTO;

public interface UserService extends CommandService<UserDTO>, QueryService<UserDTO> {
    Messenger modify(UserDTO user);

    default User dtoToEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .job(dto.getJob())
                .build();
    }

    default UserDTO entityToDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .job(user.getJob())
                .build();
    }

    Messenger login(UserDTO param);

    Boolean logout(String accessToken);

    Boolean existsByUsername(String username);

    User autoRegister();
}
