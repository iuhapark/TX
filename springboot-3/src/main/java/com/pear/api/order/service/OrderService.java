package com.pear.api.order.service;

import com.pear.api.order.model.Order;
import com.pear.api.user.model.User;

public interface OrderService {
    Order autoOrder(User user);
}
