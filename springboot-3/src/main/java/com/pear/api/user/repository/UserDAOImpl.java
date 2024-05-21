package com.pear.api.user.repository;

import com.pear.api.user.model.UserDTO;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class UserDAOImpl implements UserDAO{

    @Override
    public List<UserDTO> getAllUsers() {
        return null;
    }
}
