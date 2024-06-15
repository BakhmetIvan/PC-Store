package nure.pcshop.service.order;

import nure.pcshop.dto.order.OrderRequestDto;
import nure.pcshop.dto.order.OrderResponseDto;
import nure.pcshop.dto.order.OrderStatusUpdateDto;
import nure.pcshop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponseDto createOrder(User user, OrderRequestDto requestDto);

    Page<OrderResponseDto> findAllOrders(User user, Pageable pageable);

    OrderResponseDto updateOrderStatus(User user, Long id, OrderStatusUpdateDto requestDto);

    OrderResponseDto cancelOrder(User user, Long id);

    Page<OrderResponseDto> findAllOrderByStatusId(Long statusId, Pageable pageable, User user);
}
