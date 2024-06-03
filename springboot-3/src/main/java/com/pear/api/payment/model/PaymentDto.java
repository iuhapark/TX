package com.pear.api.payment.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pear.api.common.emums.PaymentStatus;
import lombok.*;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PaymentDto {
    private Long id;
    private String orderUid;
    private String itemName;
    private Long price;
    private String buyerEmail;
    private String buyerName;
    private String buyerTel;
    private String buyerAddr;
    private PaymentStatus status;

    @Builder
    public PaymentDto(Long id, String orderUid, String itemName, Long price, String buyerEmail, String buyerName, String buyerTel, String buyerAddr, PaymentStatus status) {
        this.id = id;
        this.orderUid = orderUid;
        this.itemName = itemName;
        this.price = price;
        this.buyerEmail = buyerEmail;
        this.buyerName = buyerName;
        this.buyerTel = buyerTel;
        this.buyerAddr = buyerAddr;
        this.status = status;
    }
}
