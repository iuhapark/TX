package com.pear.api.user.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.user.model.User;
import com.pear.api.user.model.UserDto;

public interface UserService extends CommandService<UserDto>, QueryService<UserDto> {

    default User dtoToEntity(UserDto dto) {
        return User.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .name(dto.getName())
                .phone(dto.getPhone())
                .age(dto.getAge())
                .sex(dto.getSex())
                .point(dto.getPoint())
                .balance(dto.getBalance())
                .build();
    }

    default UserDto entityToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .phone(user.getPhone())
                .age(user.getAge())
                .sex(user.getSex())
                .point(user.getPoint())
                .balance(user.getBalance())
                .build();
    }

    Messenger login(UserDto param);

    Boolean logout(String accessToken);

    Messenger modify(UserDto user);

    User autoRegister();

    Messenger modifyBalance(UserDto user);

    Boolean existsByEmail(String email);

}
