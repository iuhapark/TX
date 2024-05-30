package com.pear.api.payment.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.order.model.Order;
import com.pear.api.order.repository.OrderRepository;
import com.pear.api.payment.model.RequestPayDto;
import com.pear.api.payment.repository.PaymentRepository;
import com.siot.IamportRestClient.IamportClient;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final IamportClient iamportClient;

@Override
public RequestPayDto findRequestDto(String orderUid) {

    Order order = orderRepository.findOrderAndPaymentAndMember(orderUid)
            .orElseThrow(() -> new IllegalArgumentException("주문이 없습니다."));

    return RequestPayDto.builder()
            .buyerName(order.getUser().getUsername())
            .buyerEmail(order.getUser().getEmail())
            .paymentPrice(order.getPayment().getPrice())
            .itemName(order.getItemName())
            .orderUid(order.getOrderUid())
            .build();
}

    @Transactional
    @Override
    public Messenger save(RequestPayDto dto) {
        entityToDto(paymentRepository.save(dtoToEntity(dto)));
        return Messenger.builder()
                .message(paymentRepository.existsById(dto.getId())) ? "SUCCESS" : "FAILURE"
                .build();
    }

    @Override
    public Messenger deleteById(Long id) {
        return null;
    }

    @Override
    public boolean existsById(Long id){
    return paymentRepository.existsById(id);
    }

    @Override
    public Messenger modify(RequestPayDto dto) {
        return null;
    }


}
