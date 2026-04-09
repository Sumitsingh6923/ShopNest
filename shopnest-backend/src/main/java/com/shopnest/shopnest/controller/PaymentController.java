package com.shopnest.shopnest.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @PostMapping("/create")
    public Map<String, Object> createPayment(@RequestParam double amount) {

        Map<String, Object> response = new HashMap<>();

        response.put("paymentId", "PAY_" + System.currentTimeMillis());
        response.put("amount", amount);
        response.put("status", "CREATED");

        return response;
    }

    @PostMapping("/success")
    public Map<String, String> paymentSuccess(@RequestParam String paymentId) {

        Map<String, String> response = new HashMap<>();

        response.put("message", "Payment successful");
        response.put("paymentId", paymentId);

        return response;
    }
}