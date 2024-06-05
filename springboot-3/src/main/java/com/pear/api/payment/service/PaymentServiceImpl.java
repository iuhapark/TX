package com.pear.api.payment.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.common.emums.PaymentStatus;
import com.pear.api.order.model.Order;
import com.pear.api.order.repository.OrderRepository;
import com.pear.api.payment.model.PaymentCallbackRequest;
import com.pear.api.payment.model.PaymentDto;
import com.pear.api.payment.repository.PaymentRepository;
import com.siot.IamportRestClient.IamportClient;

import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.request.CancelData;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final OrderRepository orderRepository;
    private final PaymentRepository payRepository;
    private final IamportClient iamportClient;

    @Override
    public PaymentDto findRequestDto(String orderUid) {

        Order order = orderRepository.findOrderAndPaymentAndUser(orderUid)
                .orElseThrow(() -> new IllegalArgumentException("주문이 없습니다."));

        return PaymentDto.builder()
                .orderUid(order.getOrderUid())
                .itemName(order.getItemName())
                .amount(order.getPayment().getAmount())
                .buyerName(order.getUser().getName())
                .buyerEmail(order.getUser().getEmail())
                .build();
    }

    @Transactional
    @Override
    public Messenger save(PaymentDto dto) {
        log.info("Parameters received through payment service: " + dto);
        com.pear.api.payment.model.Payment payment = dtoToEntity(dto);
        com.pear.api.payment.model.Payment savedPayment = payRepository.save(payment);
        boolean exists = payRepository.existsById(savedPayment.getId());
        return Messenger.builder()
                .message(exists ? "SUCCESS" : "FAILURE")
                .build();
    }


    @Override
    public IamportResponse<Payment> paymentByCallback(PaymentCallbackRequest request) {

        try {
            // 결제 단건 조회(아임포트)
            IamportResponse<Payment> iamportResponse = iamportClient.paymentByImpUid(request.getPaymentUid());
            // 주문내역 조회
            Order order = orderRepository.findOrderAndPayment(request.getOrderUid())
                    .orElseThrow(() -> new IllegalArgumentException("주문 내역이 없습니다."));

            // 결제 완료가 아니면
            if (!iamportResponse.getResponse().getStatus().equals("OK")) {
                // 주문, 결제 삭제
                orderRepository.delete(order);
                payRepository.delete(order.getPayment());

                throw new RuntimeException("결제 미완료");
            }

            // DB에 저장된 결제 금액
            Long amount = order.getPayment().getAmount();
            // 실 결제 금액
            int iamportPrice = iamportResponse.getResponse().getAmount().intValue();

            // 결제 금액 검증
            if (iamportPrice != amount) {
                // 주문, 결제 삭제
                orderRepository.delete(order);
                payRepository.delete(order.getPayment());

                // 결제금액 위변조로 의심되는 결제금액을 취소(아임포트)
                iamportClient.cancelPaymentByImpUid(new CancelData(iamportResponse.getResponse().getImpUid(), true, new BigDecimal(iamportPrice)));

                throw new RuntimeException("결제금액 위변조 의심");
            }

            // 결제 상태 변경
            order.getPayment().changePaymentBySuccess(PaymentStatus.OK, iamportResponse.getResponse().getImpUid());

            return iamportResponse;

        } catch (IamportResponseException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @Override
    public Messenger deleteById(Long id) {
        return null;
    }

    @Override
    public List<PaymentDto> findAll() {
        return null;
    }

    @Override
    public Optional<PaymentDto> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Messenger count() {
        return null;
    }

    @Override
    public boolean existsById(Long id) {
        return payRepository.existsById(id);
    }

    @Transactional
    @Override
    public Messenger modify(PaymentDto dto) {
        return null;
    }

    @Override
    public PaymentDto getBalance(Long id) {
        return null;
    }

    @Override
    public Messenger charge(PaymentDto dto) {
        return null;
    }

    @Override
    public Messenger withdraw(PaymentDto dto) {
        return null;
    }

    @Override
    public void cancel(PaymentDto dto) {

    }

}
