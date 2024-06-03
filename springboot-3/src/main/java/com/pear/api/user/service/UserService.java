package com.pear.api.user.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.user.model.User;
import com.pear.api.user.model.UserDto;

public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {
    Messenger modify(UserDto user);

    default User dtoToEntity(UserDto dto) {
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

    default UserDto entityToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .name(user.getName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .job(user.getJob())
                .build();
    }

    Messenger login(UserDto param);

    Boolean logout(String accessToken);

    Boolean existsByUsername(String username);

    User autoRegister();
}
