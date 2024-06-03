package com.pear.api.user.repository;

import com.pear.api.user.model.UserDto;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserDAOImpl implements UserDAO{

    @Override
    public List<UserDto> getAllUsers() {
        return null;
    }
}
