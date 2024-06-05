package com.pear.api.payment.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pear.api.common.emums.PaymentStatus;
import lombok.*;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentDto {
    private String orderUid;
    private String itemName;
    private Long amount;
    private String buyerEmail;
    private String buyerName;
    private String buyerTel;
    private String buyerAddr;
    private PaymentStatus status;

    @Builder
    public PaymentDto(String orderUid, String itemName, Long amount, String buyerEmail, String buyerName, String buyerTel, String buyerAddr, PaymentStatus status) {
        this.orderUid = orderUid;
        this.itemName = itemName;
        this.amount = amount;
        this.buyerEmail = buyerEmail;
        this.buyerName = buyerName;
        this.buyerTel = buyerTel;
        this.buyerAddr = buyerAddr;
        this.status = status;
    }
}
