package com.app.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entities.Cart;
import com.app.entities.CartItem;
import com.app.entities.Product;
import com.app.exceptions.APIException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.payloads.CartDTO;
import com.app.payloads.ProductDTO;
import com.app.repositories.CartItemRepo;
import com.app.repositories.CartRepo;
import com.app.repositories.ProductRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private CartItemRepo cartItemRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public CartDTO addProductToCart(Long cartId, Long productId, Integer quantity) {
//		The method adds a product to the cart, ensuring it is not already there, 
//		checking product availability, and updating the cart and product details. 
//		It returns the updated cart details in a CartDTO object.
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));
		
		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
		
		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);
		
		if (cartItem != null) {
			throw new APIException("Product " + product.getProductName() + " already exists in the cart");
		}

		if (product.getQuantity() == 0) {
			throw new APIException(product.getProductName() + " is not available");
		}

		if (product.getQuantity() < quantity) {
			throw new APIException("Please, make an order of the " + product.getProductName()
					+ " less than or equal to the quantity " + product.getQuantity() + ".");
		}
		
		CartItem newCartItem = new CartItem();
		
		newCartItem.setProduct(product);
		newCartItem.setCart(cart);
		newCartItem.setQuantity(quantity);
		newCartItem.setDiscount(product.getDiscount());
		newCartItem.setProductPrice(product.getSpecialPrice());
		
		cartItemRepo.save(newCartItem);
		
		product.setQuantity(product.getQuantity() - quantity);
		
		cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));
		
		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
		
		List<ProductDTO> productDTOs = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());
		
		cartDTO.setProducts(productDTOs);
		
		return cartDTO;
	}

	@Override
	public List<CartDTO> getAllCarts() {
		
//		The method retrieves all carts from the repository.
//		If no carts are found, it throws an exception.
//		It maps the Cart entities to CartDTOs, including their products.
//		The mapped CartDTOs are returned as a list.
		
		List<Cart> carts = cartRepo.findAll();

		if (carts.size() == 0) {
			throw new APIException("No cart exists");
		}

		List<CartDTO> cartDTOs = carts.stream().map(cart -> {
			CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

			List<ProductDTO> products = cart.getCartItems().stream()
					.map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());

			cartDTO.setProducts(products);

			return cartDTO;

		}).collect(Collectors.toList());

		return cartDTOs;
	}

	@Override
	public CartDTO getCart(String emailId, Long cartId) {
//		This method fetches a cart based on the provided emailId and cartId.
//		If the cart does not exist, it throws a ResourceNotFoundException.
//		It maps the Cart entity to a CartDTO and includes the list of products in the cart.
//		Finally, it returns the CartDTO object.
		Cart cart = cartRepo.findCartByEmailAndCartId(emailId, cartId);

		if (cart == null) {
			throw new ResourceNotFoundException("Cart", "cartId", cartId);
		}

		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
		
		List<ProductDTO> products = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());

		cartDTO.setProducts(products);

		return cartDTO;
	}

	@Override
	public CartDTO updateProductQuantityInCart(Long cartId, Long productId, Integer quantity) {
//		This method updates the quantity of a product in a cart.
//		It checks the availability of the product and whether the product is already in the cart.
//		It updates the inventory quantity, the cart item details, and the cart's total price.
//		Finally, it returns the updated cart details in a CartDTO object.
		
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

		if (product.getQuantity() == 0) {
			throw new APIException(product.getProductName() + " is not available");
		}

		if (product.getQuantity() < quantity) {
			throw new APIException("Please, make an order of the " + product.getProductName()
					+ " less than or equal to the quantity " + product.getQuantity() + ".");
		}

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);

		if (cartItem == null) {
			throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
		}

		double cartPrice = cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity());

		product.setQuantity(product.getQuantity() + cartItem.getQuantity() - quantity);

		cartItem.setProductPrice(product.getSpecialPrice());
		cartItem.setQuantity(quantity);
		cartItem.setDiscount(product.getDiscount());

		cart.setTotalPrice(cartPrice + (cartItem.getProductPrice() * quantity));

		cartItem = cartItemRepo.save(cartItem);

		CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

		List<ProductDTO> productDTOs = cart.getCartItems().stream()
				.map(p -> modelMapper.map(p.getProduct(), ProductDTO.class)).collect(Collectors.toList());

		cartDTO.setProducts(productDTOs);

		return cartDTO;

	}

	@Override
	public void updateProductInCarts(Long cartId, Long productId) {
//		This method updates the product price in a cart based on the special price of the product.
//		It checks for the existence of the cart, product, and cart item.
//		It recalculates the cart's total price by updating the cart item's price.
//		Finally, it saves the updated cart item back to the repository.
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);

		if (cartItem == null) {
			throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
		}

		double cartPrice = cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity());

		cartItem.setProductPrice(product.getSpecialPrice());

		cart.setTotalPrice(cartPrice + (cartItem.getProductPrice() * cartItem.getQuantity()));

		cartItem = cartItemRepo.save(cartItem);
	}

	@Override
	public String deleteProductFromCart(Long cartId, Long productId) {
//		This method removes a product from the cart.
//		It checks for the existence of the cart and cart item.
//		It updates the cart's total price and restores the product's quantity.
//		Finally, it deletes the cart item and returns a confirmation message.
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);

		if (cartItem == null) {
			throw new ResourceNotFoundException("Product", "productId", productId);
		}

		cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity()));

		Product product = cartItem.getProduct();
		product.setQuantity(product.getQuantity() + cartItem.getQuantity());

		cartItemRepo.deleteCartItemByProductIdAndCartId(cartId, productId);

		return "Product " + cartItem.getProduct().getProductName() + " removed from the cart !!!";
	}

}
