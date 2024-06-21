package com.pear.api.payment.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pear.api.common.emums.PaymentStatus;
import lombok.*;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentDto {
    private String orderUid;
    private Long amount;
    private PaymentStatus status;

    @Builder
    public PaymentDto(String orderUid, String itemName, Long amount, String buyerEmail, String buyerName, String buyerTel, String buyerAddr, PaymentStatus status) {
        this.orderUid = orderUid;
        this.amount = amount;
        this.status = status;
    }
}
