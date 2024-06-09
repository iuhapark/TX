package com.pear.api.product.service;

import com.pear.api.common.component.Messenger;
import com.pear.api.product.model.Product;
import com.pear.api.product.model.ProductDto;
import com.pear.api.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Transactional
    @Override
    public Messenger save(ProductDto productDto) {
        entityToDto((productRepository.save(dtoToEntity(productDto))));
        return Messenger.builder()
                .message(productRepository.existsById(productDto.getId()) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Transactional
    @Override
    public Messenger deleteById(Long id) {
        productRepository.deleteById(id);
        return Messenger.builder()
                .message(productRepository.findById(id).isPresent() ? "FAILURE" : "SUCCESS")
                .build();
    }

    @Transactional
    @Override
    public Messenger modify(ProductDto productDto) {
        Optional<Product> optionalProduct = productRepository.findById(productDto.getId());
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            Product modifyProduct = product.toBuilder()
                    .itemName(productDto.getItemName())
                    .price(productDto.getPrice())
                    .build();
            productRepository.save(modifyProduct);
            return Messenger.builder().message("SUCCESS").build();
        } else {
            return Messenger.builder().message("FAILURE").build();
        }
    }

    @Override
    public List<ProductDto> findAll() {
        return productRepository.findAllByOrderByIdAsc().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ProductDto> findById(Long id) {
        return productRepository.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public Messenger count() {
        return Messenger.builder()
                .message(productRepository.count() + "").build();
    }

    @Override
    public boolean existsById(Long id) {
        return productRepository.existsById(id);
    }
}
