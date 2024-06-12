package nure.pcshop.service.shoppingcart;

import nure.pcshop.dto.shoppingcart.CartItemRequestDto;
import nure.pcshop.dto.shoppingcart.CartItemUpdateRequestDto;
import nure.pcshop.dto.shoppingcart.ShoppingCartResponseDto;
import nure.pcshop.model.User;

public interface ShoppingCartService {
    void createShoppingCart(User user);

    ShoppingCartResponseDto saveCartItem(CartItemRequestDto requestDto, User user);

    ShoppingCartResponseDto getShoppingCart(User user);

    ShoppingCartResponseDto updateQuantity(Long id, CartItemUpdateRequestDto requestDto, User user);

    void deleteCartItemById(Long id, User user);
}
