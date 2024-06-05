package com.pear.api.product.controller;


import com.pear.api.common.component.Messenger;
import com.pear.api.payment.model.PaymentDto;
import com.pear.api.product.model.ProductDto;
import com.pear.api.product.service.ProductService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/product")
@Slf4j
@Controller
@RequiredArgsConstructor
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")
})
public class ProductController {
    private final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<Messenger> saveProduct(@RequestBody ProductDto dto) {
        log.info("Parameters received through controller" + dto);
        return ResponseEntity.ok(productService.save(dto));
    }

}
