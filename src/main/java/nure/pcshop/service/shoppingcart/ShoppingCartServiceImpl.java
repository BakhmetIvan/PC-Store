package nure.pcshop.service.shoppingcart;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.shoppingcart.CartItemRequestDto;
import nure.pcshop.dto.shoppingcart.CartItemUpdateRequestDto;
import nure.pcshop.dto.shoppingcart.ShoppingCartResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.ShoppingCartMapper;
import nure.pcshop.model.CartItem;
import nure.pcshop.model.Laptop;
import nure.pcshop.model.ShoppingCart;
import nure.pcshop.model.User;
import nure.pcshop.repository.shoppingcart.CartItemRepository;
import nure.pcshop.repository.shoppingcart.ShoppingCartRepository;
import nure.pcshop.repository.products.LaptopRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {
    private final static String NO_FOUND_CART_EXCEPTION_MESSAGE =
            "Не вдається знайти кошик за користувачем з id = %d";
    private final static String NO_FOUND_CART_ITEM_EXCEPTION_MESSAGE =
            "Не вдається знайти елемент кошика з id = %d за користувачем з id = %d";
    private final ShoppingCartRepository cartRepository;
    private final LaptopRepository laptopRepository;
    private final CartItemRepository cartItemRepository;
    private final ShoppingCartMapper cartMapper;

    @Override
    public void createShoppingCart(User user) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUser(user);
        cartRepository.save(shoppingCart);
    }

    @Transactional
    @Override
    public ShoppingCartResponseDto saveCartItem(CartItemRequestDto requestDto, User user) {
        Laptop laptop = laptopRepository.findById(requestDto.getLaptopId()).orElseThrow(
                () -> new EntityNotFoundException("Не вдається знайти товар з id: "
                        + requestDto.getLaptopId())
        );
        ShoppingCart shoppingCart = cartRepository.findShoppingCartByUser(user).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        NO_FOUND_CART_EXCEPTION_MESSAGE, user.getId()))
        );
        CartItem cartItem = new CartItem();
        cartItem.setShoppingCart(shoppingCart);
        cartItem.setLaptop(laptop);
        cartItem.setPrice(laptop.getPrice().multiply(BigDecimal.valueOf(requestDto.getQuantity())));
        cartItem.setQuantity(requestDto.getQuantity());
        cartItemRepository.save(cartItem);
        shoppingCart.setTotal(shoppingCart.getTotal().add(cartItem.getPrice()));
        cartRepository.save(shoppingCart);
        return cartMapper.toDto(shoppingCart);
    }

    @Override
    public ShoppingCartResponseDto getShoppingCart(User user) {
        return cartMapper.toDto(cartRepository.findShoppingCartByUser(user).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        NO_FOUND_CART_EXCEPTION_MESSAGE, user.getId())))
        );
    }

    @Transactional
    @Override
    public ShoppingCartResponseDto updateQuantity(Long id,
                                                  CartItemUpdateRequestDto requestDto,
                                                  User user) {
        ShoppingCart cart = cartRepository.findShoppingCartByUser(user).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        NO_FOUND_CART_EXCEPTION_MESSAGE, user.getId()))
        );
        CartItem cartItem = cartItemRepository.findByIdAndShoppingCartId(id, cart.getId())
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format(NO_FOUND_CART_ITEM_EXCEPTION_MESSAGE,
                                id, user.getId()))
                );
        BigDecimal oldTotalPrice = cartItem.getPrice();
        BigDecimal newTotalPrice = cartItem.getLaptop().getPrice().multiply(
                BigDecimal.valueOf(requestDto.getQuantity()));
        cartItem.setQuantity(requestDto.getQuantity());
        cartItem.setPrice(newTotalPrice);
        cart.setTotal(cart.getTotal().subtract(oldTotalPrice).add(newTotalPrice));
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
        return cartMapper.toDto(cart);
    }

    @Transactional
    @Override
    public void deleteCartItemById(Long id, User user) {
        ShoppingCart cart = cartRepository.findShoppingCartByUser(user).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        NO_FOUND_CART_EXCEPTION_MESSAGE, user.getId()))
        );
        CartItem cartItem = cartItemRepository.findByIdAndShoppingCartId(id, cart.getId())
                .orElseThrow(() -> new EntityNotFoundException(
                                String.format(NO_FOUND_CART_ITEM_EXCEPTION_MESSAGE,
                                        id, user.getId()))
                );
        cart.setTotal(cart.getTotal().subtract(cartItem.getPrice()));
        cartItemRepository.delete(cartItem);
        cartRepository.save(cart);
    }
}
