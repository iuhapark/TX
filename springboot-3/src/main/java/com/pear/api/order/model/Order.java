package com.pear.api.order.model;

import com.pear.api.payment.model.Payment;
import com.pear.api.product.model.Product;
import com.pear.api.user.model.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "orders")
@NoArgsConstructor

public class Order {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long amount;
    private String itemName;
    private String orderUid; // 주문 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Payment payment;

    @Builder
    public Order(Long id, Long amount, String itemName, String orderUid, User user, Payment payment) {
        this.id = id;
        this.amount = amount;
        this.itemName = itemName;
        this.orderUid = orderUid;
        this.user = user;
        this.payment = payment;
    }
}
