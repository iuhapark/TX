package com.pear.api.order.service;

import com.pear.api.common.emums.PaymentStatus;
import com.pear.api.order.model.Order;
import com.pear.api.order.repository.OrderRepository;
import com.pear.api.payment.model.Payment;
import com.pear.api.payment.repository.PaymentRepository;
import com.pear.api.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    public Order autoOrder(User user) {
        // 임시 결제내역 생성
        Payment payment = Payment.builder()
                .amount(1000L)
//                .status(PaymentStatus.READY)
                .build();
        paymentRepository.save(payment);

        // 주문 생성
        Order order = Order.builder()
                .user(user)
                .amount(1000L)
                .itemName("Test item")
                .orderUid(UUID.randomUUID().toString())
                .payment(payment)
                .build();

        return orderRepository.save(order);
    }
}
