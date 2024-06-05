package com.pear.api.payment.model;

import com.pear.api.common.emums.PaymentStatus;
import com.pear.api.common.model.BaseEntity;
import com.pear.api.product.model.Product;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

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
    private String itemName;
    private Long amount;
    private String buyerName;
    private String buyerEmail;
    private String buyerTel;
    private String buyerAddr;
    private PaymentStatus status;

    @Builder
    public Payment(Long id, String paymentUid, String itemName, Long amount, String buyerName, String buyerEmail, String buyerTel, String buyerAddr, PaymentStatus status) {
        this.id = id;
        this.paymentUid = paymentUid;
        this.itemName = itemName;
        this.amount = amount;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.buyerTel = buyerTel;
        this.buyerAddr = buyerAddr;
        this.status = status;
    }
    public void changePaymentBySuccess(PaymentStatus status, String paymentUid) {
        this.status = status;
        this.paymentUid = paymentUid;
    }
}
