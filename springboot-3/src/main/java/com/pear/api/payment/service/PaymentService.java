package com.pear.api.payment.service;

import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.payment.model.PaymentCallbackRequest;
import com.pear.api.payment.model.PaymentDto;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import java.util.UUID;

public interface PaymentService extends CommandService<PaymentDto>, QueryService<PaymentDto> {
    // 결제 요청 데이터 조회
    PaymentDto findRequestDto(String orderUid);
    // 결제(콜백)
    IamportResponse<Payment> paymentByCallback(PaymentCallbackRequest request);

    default com.pear.api.payment.model.Payment dtoToEntity(PaymentDto dto) {
        return com.pear.api.payment.model.Payment.builder()
                .paymentUid(UUID.randomUUID().toString())
                .itemName(dto.getItemName())
                .price(dto.getPrice())
                .buyerEmail(dto.getBuyerEmail())
                .buyerName(dto.getBuyerName())
                .buyerTel(dto.getBuyerTel())
                .buyerAddr(dto.getBuyerAddr())
                .build();
    }

    default PaymentDto entityToDto(com.pear.api.payment.model.Payment pay){
        return PaymentDto.builder()
                .orderUid(UUID.randomUUID().toString())
                .itemName(pay.getItemName())
                .price(pay.getPrice())
                .buyerEmail(pay.getBuyerEmail())
                .buyerName(pay.getBuyerName())
                .buyerTel(pay.getBuyerTel())
                .buyerAddr(pay.getBuyerAddr())
                .build();
    }


}
