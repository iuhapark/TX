package com.pear.api.user.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.pear.api.common.component.Messenger;
import com.pear.api.user.dtos.TokenDto;
import com.pear.api.user.dtos.UrlDto;
import com.pear.api.user.model.UserDto;
import com.pear.api.user.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.Arrays;

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

    @SuppressWarnings("static-access")
    @PostMapping("/save")
    public ResponseEntity<Messenger> save(@RequestBody UserDto dto) throws SQLException {
        log.info("Parameters received through controller: " + dto);
        return ResponseEntity.ok(service.save(dto));
    }

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

    @GetMapping("/existsEmail")
    public ResponseEntity<Boolean> existsByEmail(@RequestParam("email") String email) {
        log.info("Parameter information of existsEmail: " + email);
        Boolean flag = service.existsByEmail(email);
        log.info("existsEmail : " + email);
        return ResponseEntity.ok(flag);
    }

}
