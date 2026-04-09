package com.shopnest.shopnest.controller;

import com.shopnest.shopnest.entity.Order;
import com.shopnest.shopnest.entity.Product;
import com.shopnest.shopnest.entity.User;
import com.shopnest.shopnest.repository.CartRepository;
import com.shopnest.shopnest.repository.OrderRepository;
import com.shopnest.shopnest.repository.OrderItemRepository;
import com.shopnest.shopnest.repository.ProductRepository;
import com.shopnest.shopnest.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    // Add Product
    @PostMapping("/product")
    public Product addProduct(@RequestBody Product product) {
        product.setDiscountedPrice(calculateDiscountedPrice(product.getPrice(), product.getDiscount()));
        return productRepository.save(product);
    }

    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable Long id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }


    // UPDATE PRODUCT
    @PutMapping("/product/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {

        Product p = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(product.getName());
        p.setPrice(product.getPrice());
        p.setDescription(product.getDescription());
        p.setStock(product.getStock());
        p.setCategory(product.getCategory());
        p.setDiscount(product.getDiscount());
        p.setDiscountedPrice(calculateDiscountedPrice(product.getPrice(), product.getDiscount()));
        p.setImageUrl(product.getImageUrl());

        return productRepository.save(p);
    }

    private long calculateDiscountedPrice(double price, int discount) {
        return Math.round(price - (price * discount) / 100.0);
    }

    // GET ALL PRODUCTS

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // DELETE PRODUCT
    @DeleteMapping("/product/{id}")
    public String deleteProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (orderItemRepository.existsByProductId(id)) {
            throw new RuntimeException(
                    "This product cannot be deleted because it is already part of an order."
            );
        }

        cartRepository.deleteAll(cartRepository.findByProductId(id));

        productRepository.delete(product);

        return "Product Deleted Successfully";
    }

    // PRODUCT COUNT
    @GetMapping("/products/count")
    public long getProductCount() {
        return productRepository.count();
    }

    // USERS

    @GetMapping("/users")
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    @GetMapping("/users/count")
    public long getUserCount() {

        return userRepository.count();
    }

    // ORDERS

    @GetMapping("/orders")
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    @GetMapping("/orders/count")
    public long getOrderCount() {

        return orderRepository.count();
    }

    // UPDATE ORDER STATUS
    @PutMapping("/orders/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestParam String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }
}
