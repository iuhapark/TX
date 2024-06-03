package com.pear.api.product.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ProductDto {
    private Long id;
    private String itemName;
    private Long price;

    @Builder
    public ProductDto(Long id, String itemName, Long price) {
        this.id = id;
        this.itemName = itemName;
        this.price = price;
    }
}
