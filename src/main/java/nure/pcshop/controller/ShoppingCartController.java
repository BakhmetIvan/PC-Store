package nure.pcshop.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.shoppingcart.CartItemRequestDto;
import nure.pcshop.dto.shoppingcart.CartItemUpdateRequestDto;
import nure.pcshop.dto.shoppingcart.ShoppingCartResponseDto;
import nure.pcshop.model.User;
import nure.pcshop.service.shoppingcart.ShoppingCartService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class ShoppingCartController {
    private final ShoppingCartService cartService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Get shopping cart",
            description = "Returns the current user's shopping cart")
    public ShoppingCartResponseDto getShoppingCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return cartService.getShoppingCart(user);
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Save cart item",
            description = "Save the cart item for the current user's shopping cart")
    public ShoppingCartResponseDto saveCartItem(@RequestBody @Valid CartItemRequestDto requestDto,
                                                Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return cartService.saveCartItem(requestDto, user);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Update book quantity",
            description = "Updates quantity of books for the cart item")
    public ShoppingCartResponseDto updateQuantity(@PathVariable @Positive Long id,
                                                  @RequestBody @Valid CartItemUpdateRequestDto requestDto,
                                                  Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return cartService.updateQuantity(id, requestDto, user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Delete cart item",
            description = "Deletes cart item from the shopping cart")
    public void deleteCartItemById(@PathVariable @Positive Long id,
                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        cartService.deleteCartItemById(id, user);
    }
}
