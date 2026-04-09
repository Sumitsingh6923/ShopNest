package com.shopnest.shopnest.service;

import com.shopnest.shopnest.entity.Cart;
import com.shopnest.shopnest.entity.Product;
import com.shopnest.shopnest.repository.CartRepository;
import com.shopnest.shopnest.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long userId, Long productId, int quantity) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        double effectivePrice = product.getDiscountedPrice() > 0
                ? product.getDiscountedPrice()
                : product.getPrice();

        Cart cart = new Cart();

        cart.setUserId(userId);
        cart.setProduct(product);
        cart.setQuantity(quantity);
        cart.setPrice(effectivePrice);

        return cartRepository.save(cart);
    }

    public List<Cart> getUserCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeCart(Long id) {
        cartRepository.deleteById(id);
    }

    public Cart updateQuantity(Long id, int quantity) {

        Cart cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        double effectivePrice = cart.getProduct().getDiscountedPrice() > 0
                ? cart.getProduct().getDiscountedPrice()
                : cart.getProduct().getPrice();

        cart.setQuantity(quantity);
        cart.setPrice(effectivePrice);

        return cartRepository.save(cart);
    }
}
