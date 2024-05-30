package com.pear.api.order.model;

import com.pear.api.payment.model.Payment;
import com.pear.api.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long price;
    private String itemName;
    private String orderUid; // 주문 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Builder
    public Order(Long price, String itemName, String orderUid, User user, Payment payment) {
        this.price = price;
        this.itemName = itemName;
        this.orderUid = orderUid;
        this.user = user;
        this.payment = payment;
    }
}
