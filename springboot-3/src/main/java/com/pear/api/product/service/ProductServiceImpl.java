package com.pear.api.product.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.product.model.ProductDto;
import com.pear.api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Override
    public Messenger save(ProductDto productDto) {
        entityToDto((productRepository.save(dtoToEntity(productDto))));
        return Messenger.builder()
                .message(productRepository.existsById(productDto.getId()) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public Messenger deleteById(Long id) {
        return null;
    }

    @Override
    public Messenger modify(ProductDto productDto) {
        return null;
    }

    @Override
    public List<ProductDto> findAll() {
        return null;
    }

    @Override
    public Optional<ProductDto> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Messenger count() {
        return null;
    }

    @Override
    public boolean existsById(Long id) {
        return false;
    }
}
