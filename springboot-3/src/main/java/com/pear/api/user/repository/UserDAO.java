package com.pear.api.user.repository;

import com.pear.api.user.model.UserDTO;

import java.util.List;

public interface UserDAO {
    List<UserDTO> getAllUsers();

}
