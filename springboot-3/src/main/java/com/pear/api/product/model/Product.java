package com.pear.api.product.model;

import com.pear.api.payment.model.Payment;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
@ToString(exclude = {"id"})
public class Product {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private Long price;

    @OneToMany(mappedBy = "product")
    private List<Payment> payments;
}
