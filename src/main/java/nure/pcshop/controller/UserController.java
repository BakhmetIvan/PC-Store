package nure.pcshop.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.order.OrderResponseDto;
import nure.pcshop.dto.review.ReviewCabinetDto;
import nure.pcshop.dto.user.UserInfoUpdateDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.model.User;
import nure.pcshop.service.order.OrderService;
import nure.pcshop.service.user.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/cabinet")
public class UserController {
    private final UserService userService;
    private final OrderService orderService;

    @GetMapping("/orders")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Returns all user's orders",
            description = "Returns a page of the user's orders using pagination and sorting")
    public Page<OrderResponseDto> findAllOrders(Authentication authentication,
                                                @PageableDefault Pageable pageable) {
        User user = (User) authentication.getPrincipal();
        return orderService.findAllOrders(user, pageable);
    }

    @GetMapping("/orders/{statusId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Returns all user's orders by status id",
            description = "Returns a page of the user's orders by status id using pagination and sorting")
    public Page<OrderResponseDto> findAllOrdersByStatusId(Authentication authentication,
                                                          @PathVariable @Positive Long statusId,
                                                          @PageableDefault Pageable pageable) {
        User user = (User) authentication.getPrincipal();
        return orderService.findAllOrderByStatusId(statusId, pageable, user);
    }

    @GetMapping("/reviews")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Returns user reviews",
            description = "Endpoint for obtaining all user reviews")
    public Page<ReviewCabinetDto> getUserReviews(Authentication authentication,
                                                 @PageableDefault Pageable pageable) {
        User user = (User) authentication.getPrincipal();
        return userService.findAllUserReviews(user, pageable);
    }

    @GetMapping("/personal-info")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Returns user info",
            description = "Endpoint for obtaining information about the user")
    public UserResponseDto getUserInfo(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return userService.getInfo(user);
    }

    @PutMapping("/personal-info")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Update user info",
            description = "Endpoint for updating information about the user")
    public UserResponseDto updateUserInfo(Authentication authentication,
                                          @RequestBody @Valid UserInfoUpdateDto updateDto) {
        User user = (User) authentication.getPrincipal();
        return userService.updateUserInfo(user, updateDto);
    }

    @DeleteMapping("/orders/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    @Operation(summary = "Cancel user order",
            description = "Updates the order status to CANCELED")
    public OrderResponseDto cancelOrder(Authentication authentication,
                                        @PathVariable @Positive Long id) {
        User user = (User) authentication.getPrincipal();
        return orderService.cancelOrder(user, id);
    }
}
