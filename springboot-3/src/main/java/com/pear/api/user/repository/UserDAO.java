package com.pear.api.user.repository;

import com.pear.api.user.model.UserDto;

import java.util.List;

public interface UserDAO {
    List<UserDto> getAllUsers();

}
