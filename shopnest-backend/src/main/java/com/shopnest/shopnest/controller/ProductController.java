package com.shopnest.shopnest.controller;

import com.shopnest.shopnest.entity.Product;
import com.shopnest.shopnest.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*"})
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // PAGINATION
    @GetMapping
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ){
        return productRepository.findAll(PageRequest.of(page, size));
    }

    // PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // SEARCH PRODUCT
    @GetMapping("/search")
    public java.util.List<Product> searchProducts(@RequestParam String keyword){
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
}
