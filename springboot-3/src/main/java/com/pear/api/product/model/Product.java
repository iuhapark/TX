package com.pear.api.product.model;

import com.pear.api.payment.model.Payment;
import jakarta.persistence.*;
import lombok.*;

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
    private String duration;
    private String date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id")
    private Payment payment;
}
