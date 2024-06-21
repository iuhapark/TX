package com.pear.api.product.service;

import com.pear.api.common.service.CommandService;
import com.pear.api.common.service.QueryService;
import com.pear.api.product.model.Product;
import com.pear.api.product.model.ProductDto;

public interface ProductService extends CommandService<ProductDto>, QueryService<ProductDto> {

    default Product dtoToEntity(ProductDto dto) {
        return Product.builder()
                .id(dto.getId())
                .itemName(dto.getItemName())
                .price(dto.getPrice())
                .build();
    }

    default ProductDto entityToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .itemName(product.getItemName())
                .price(product.getPrice())
                .build();
    }
}
