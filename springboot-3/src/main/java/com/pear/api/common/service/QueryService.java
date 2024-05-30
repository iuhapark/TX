package com.pear.api.common.service;

import com.pear.api.common.component.Messenger;

import java.util.List;
import java.util.Optional;

public interface QueryService<T> {
    List<T> findAll() ;
    Optional<T> findById(Long id);
    Messenger count();
    boolean existsById(Long id);
}
