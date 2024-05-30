package com.pear.api.payment.controller;

import com.pear.api.common.component.Messenger;
import com.pear.api.payment.model.RequestPayDto;
import com.pear.api.payment.service.PaymentService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/payment")
@Slf4j
@Controller
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
})
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/save")
    public ResponseEntity<Messenger> savePayment(@RequestBody RequestPayDto dto) {
        // payment save 로직
        return ResponseEntity.ok(paymentService.save(dto));
    }

}
