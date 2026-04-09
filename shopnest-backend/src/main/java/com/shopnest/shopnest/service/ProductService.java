package com.shopnest.shopnest.service;

import com.shopnest.shopnest.entity.Product;
import com.shopnest.shopnest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository repo;

    // GET ALL PRODUCTS
    public List<Product> getAllProducts(){
        return repo.findAll();
    }

    // ADD PRODUCT
    public Product addProduct(Product product){
        return repo.save(product);
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id){
        repo.deleteById(id);
    }

    // SEARCH PRODUCT
    public List<Product> search(String name){
        return repo.findByNameContainingIgnoreCase(name);
    }

    // FILTER PRODUCT
    public List<Product> filter(String category){
        return repo.findByCategory(category);
    }

    // UPDATE PRODUCT
    public Product updateProduct(Long id, Product updatedProduct){

        Optional<Product> productOptional = repo.findById(id);

        if(productOptional.isPresent()){

            Product product = productOptional.get();

            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setCategory(updatedProduct.getCategory());
            product.setImageUrl(updatedProduct.getImageUrl());
            product.setStock(updatedProduct.getStock());

            return repo.save(product);
        }

        return null;
    }

    // GET PRODUCT BY ID
    public Product getProductById(Long id){

        return repo.findById(id).orElse(null);

    }

}