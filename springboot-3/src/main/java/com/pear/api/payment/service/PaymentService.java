package com.pear.api.payment.service;

import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.payment.model.PaymentCallbackRequest;
import com.pear.api.payment.model.RequestPayDto;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

public interface PaymentService extends CommandService<RequestPayDto>, QueryService<RequestPayDto> {
    // 결제 요청 데이터 조회
    RequestPayDto findRequestDto(String orderUid);
    // 결제(콜백)
    IamportResponse<Payment> paymentByCallback(PaymentCallbackRequest request);

}
