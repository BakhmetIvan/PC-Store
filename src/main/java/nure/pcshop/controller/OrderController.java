package nure.pcshop.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.order.OrderRequestDto;
import nure.pcshop.dto.order.OrderResponseDto;
import nure.pcshop.dto.order.OrderStatusUpdateDto;
import nure.pcshop.model.User;
import nure.pcshop.service.order.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @Operation(summary = "Create new order",
            description = "Creates a new order for the user that will contain " +
                    "items from shopping cart. After order was created, " +
                    "the shopping cart is cleared")
    public OrderResponseDto createOrder(Authentication authentication,
                                        @RequestBody @Valid OrderRequestDto requestDto) {
        User user = (User) authentication.getPrincipal();
        return orderService.createOrder(user, requestDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Update status of order",
            description = "End point for admin which serves to update the order status")
    public OrderResponseDto updateOrderStatus(Authentication authentication,
                                              @Positive @PathVariable Long id,
                                              @RequestBody @Valid OrderStatusUpdateDto requestDto) {
        User user = (User) authentication.getPrincipal();
        return orderService.updateOrderStatus(user, id, requestDto);
    }
}
