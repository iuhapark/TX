package com.pear.api.common.service;

import java.util.List;

public interface QueryService<T> {
    List<T> findAll() ;
    boolean existsById(Long id);
}
