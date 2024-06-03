package com.pear.api.product.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Entity
@NoArgsConstructor
@Component
@Data
public class Product {
    @Id
    @Column(name = "product_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private Long price;

    @Builder
    public Product(Long id, String itemName, Long price) {
        this.id = id;
        this.itemName = itemName;
        this.price = price;
    }
}
