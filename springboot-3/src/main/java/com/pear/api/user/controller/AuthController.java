package com.pear.api.user.controller;

import com.pear.api.common.component.Messenger;
import com.pear.api.user.model.UserDto;
import com.pear.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
})
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
@Log4j2

public class AuthController {
    private final UserService service;

    @PostMapping(path = "/login")
    public ResponseEntity<Messenger> login(@RequestBody UserDto dto) throws SQLException {
        Messenger messenger = service.login(dto);
        return ResponseEntity.ok(messenger);
    }

    @GetMapping("/existsUsername")
    public ResponseEntity<Boolean> existsByUsername(@RequestParam("username") String username) {
        log.info("Parameter information of existsUsername: " + username);
        Boolean flag = service.existsByUsername(username);
        log.info("existsUsername : " + username);
        return ResponseEntity.ok(flag);
    }
}
