package com.shopnest.shopnest.controller;

import com.shopnest.shopnest.entity.Cart;
import com.shopnest.shopnest.service.CartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {

        return cartService.addToCart(userId, productId, quantity);
    }

    @GetMapping("/user/{userId}")
    public List<Cart> getUserCart(@PathVariable Long userId) {
        return cartService.getUserCart(userId);
    }

    @DeleteMapping("/remove/{id}")
    public void removeCart(@PathVariable Long id) {
        cartService.removeCart(id);
    }

    @PutMapping("/update/{id}")
    public Cart updateQuantity(
            @PathVariable Long id,
            @RequestParam int quantity) {

        return cartService.updateQuantity(id, quantity);
    }
}