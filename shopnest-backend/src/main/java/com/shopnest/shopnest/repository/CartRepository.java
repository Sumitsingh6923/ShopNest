package com.shopnest.shopnest.repository;
import com.shopnest.shopnest.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);

    List<Cart> findByProductId(Long productId);
}


