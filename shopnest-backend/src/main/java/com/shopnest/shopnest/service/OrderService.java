package com.shopnest.shopnest.service;

import com.shopnest.shopnest.entity.Cart;
import com.shopnest.shopnest.entity.Order;
import com.shopnest.shopnest.entity.OrderItem;
import com.shopnest.shopnest.repository.CartRepository;
import com.shopnest.shopnest.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    public Order createOrder(Long userId) {

        List<Cart> cartItems = cartRepository.findByUserId(userId);

        if(cartItems.isEmpty()){
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();

        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        double total = 0;
        int totalQuantity = 0;

        List<OrderItem> items = new ArrayList<>();

        for(Cart cart : cartItems){
            double effectivePrice = cart.getProduct().getDiscountedPrice() > 0
                    ? cart.getProduct().getDiscountedPrice()
                    : cart.getProduct().getPrice();

            OrderItem item = new OrderItem();

            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(effectivePrice);

            item.setOrder(order);

            total += effectivePrice * cart.getQuantity();
            totalQuantity += cart.getQuantity();

            items.add(item);
        }

        order.setItems(items);
        order.setTotalPrice(total);
        order.setQuantity(totalQuantity);

        Order savedOrder = orderRepository.save(order);

        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUser(Long userId){
        return orderRepository.findByUserId(userId);
    }

    public Order updateOrderStatus(Long orderId,String status){

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    public void deleteOrder(Long orderId){
        orderRepository.deleteById(orderId);
    }
}
