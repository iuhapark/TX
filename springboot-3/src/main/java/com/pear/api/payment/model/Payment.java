package com.pear.api.payment.model;

import com.pear.api.common.emums.PaymentStatus;
import com.pear.api.common.model.BaseEntity;
import com.pear.api.product.model.Product;
import com.pear.api.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity(name = "payments")
@Getter
@NoArgsConstructor
@Component
@Setter
public class Payment extends BaseEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String paymentUid; //결제 고유 번호
    private Long amount;
    private PaymentStatus status;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @Builder
    public Payment(Long id, String paymentUid, Long amount, PaymentStatus status) {
        this.id = id;
        this.paymentUid = paymentUid;
        this.amount = amount;
        this.status = status;
    }

    public void changePaymentBySuccess(PaymentStatus status, String paymentUid) {
        this.status = status;
        this.paymentUid = paymentUid;
    }
}
