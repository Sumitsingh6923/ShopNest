package com.shopnest.shopnest.controller;

import com.shopnest.shopnest.entity.Order;
import com.shopnest.shopnest.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(originPatterns = {"http://localhost:*", "http://127.0.0.1:*"})
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create/{userId}")
    public Order createOrder(@PathVariable Long userId){
        return orderService.createOrder(userId);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId){
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders(){
        return orderService.getAllOrders();
    }

    @PutMapping("/update-status/{orderId}")
    public Order updateOrderStatus(@PathVariable Long orderId,
                                   @RequestParam String status){
        return orderService.updateOrderStatus(orderId,status);
    }
}
