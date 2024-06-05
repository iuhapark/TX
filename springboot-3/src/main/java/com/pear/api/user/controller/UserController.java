package com.pear.api.user.controller;

import com.pear.api.common.component.Messenger;
import com.pear.api.payment.service.PaymentService;
import com.pear.api.user.model.UserDto;
import com.pear.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/users")
@Slf4j
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
})
public class UserController {
    private final UserService service;
    private final PaymentService paymentService;

    @GetMapping("/detail")
    public ResponseEntity<Optional<UserDto>> findById(@RequestParam("id") Long id) {
        log.info("Parameter information of findById: " + id);
        return ResponseEntity.ok(service.findById(id));
    }


    @PutMapping("/modify")
    public ResponseEntity<Messenger> modify(@RequestBody UserDto dto) {
        return ResponseEntity.ok(service.modify(dto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Messenger> deleteById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(service.deleteById(id));
    }


    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsById(@RequestParam("id") Long id) {
        return ResponseEntity.ok(service.existsById(id));
    }

    @GetMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestHeader("authorization") String accessToken) {
        var flag = service.logout(accessToken);
        return ResponseEntity.ok(flag);
    }

    @PutMapping("/modifyBalance")
    public ResponseEntity<Messenger> modifyBalance(@RequestBody UserDto dto) {
        return ResponseEntity.ok(service.modifyBalance(dto));
    }

}
