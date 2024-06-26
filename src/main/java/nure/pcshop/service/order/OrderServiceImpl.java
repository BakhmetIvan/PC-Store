package nure.pcshop.service.order;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.order.OrderRequestDto;
import nure.pcshop.dto.order.OrderResponseDto;
import nure.pcshop.dto.order.OrderStatusUpdateDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.OrderMapper;
import nure.pcshop.model.CartItem;
import nure.pcshop.model.Laptop;
import nure.pcshop.model.Order;
import nure.pcshop.model.OrderItem;
import nure.pcshop.model.OrderStatus;
import nure.pcshop.model.ShoppingCart;
import nure.pcshop.model.User;
import nure.pcshop.repository.DeliveryTypeRepository;
import nure.pcshop.repository.PaymentTypeRepository;
import nure.pcshop.repository.order.OrderItemRepository;
import nure.pcshop.repository.order.OrderRepository;
import nure.pcshop.repository.order.OrderStatusRepository;
import nure.pcshop.repository.products.LaptopRepository;
import nure.pcshop.repository.shoppingcart.ShoppingCartRepository;
import nure.pcshop.service.products.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService{
    private final OrderMapper orderMapper;
    private final OrderRepository orderRepository;
    private final ShoppingCartRepository cartRepository;
    private final DeliveryTypeRepository deliveryTypeRepository;
    private final PaymentTypeRepository paymentTypeRepository;
    private final OrderStatusRepository orderStatusRepository;
    private final OrderItemRepository orderItemRepository;
    private final LaptopRepository laptopRepository;

    @Transactional
    @Override
    public OrderResponseDto createOrder(User user, OrderRequestDto requestDto) {
        ShoppingCart shoppingCart = cartRepository.findShoppingCartByUser(user).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "Не вдається знайти кошик за користувачем з id = %d", user.getId()))
        );
        if (shoppingCart.getCartItems().isEmpty()) {
            throw new EntityNotFoundException("Кошик не може бути пустим для створення замовлення");
        }
        Order order = orderMapper.toModel(requestDto);
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(orderStatusRepository.findByStatus(
                OrderStatus.Status.PENDING).orElseThrow(
                () -> new EntityNotFoundException("Не вдається знайти статус замовлення")
        ));
        order.setDeliveryType(deliveryTypeRepository.findById(
                requestDto.getDeliveryId()).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "Не вдається знайти тип доставки з id = %d", requestDto.getDeliveryId()))
        ));
        order.setPaymentType(paymentTypeRepository.findById(
                requestDto.getPaymentId()).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "Не вдається знайти тип оплати з id = %d", requestDto.getPaymentId()))
        ));
        order.setTotal(shoppingCart.getTotal().add(order.getDeliveryType().getPrice()));
        orderRepository.save(order);
        order.setOrderItems(setOrderItemsFromShoppingCart(order, shoppingCart.getCartItems()));
        shoppingCart.getCartItems().clear();
        shoppingCart.setTotal(BigDecimal.ZERO);
        cartRepository.save(shoppingCart);
        return orderMapper.toDto(orderRepository.save(order));
    }

    @Override
    public Page<OrderResponseDto> findAllOrders(User user, Pageable pageable) {
        Page<Order> orders = orderRepository.findAllByUser(user, pageable);
        return orders.map(orderMapper::toDto);
    }

    @Transactional
    @Override
    public OrderResponseDto updateOrderStatus(User user, Long id, OrderStatusUpdateDto requestDto) {
        Order order = orderRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException(String.format(
                        "Не вдається знайти замовлення з id = %d", id))
        );
        order.setStatus(orderStatusRepository.findByStatus(
                OrderStatus.Status.PENDING).orElseThrow(
                () -> new EntityNotFoundException("Не вдається знайти статус замовлення")
        ));
        order.setManager(user);
        return orderMapper.toDto(orderRepository.save(order));
    }

    @Transactional
    @Override
    public OrderResponseDto cancelOrder(User user, Long id) {
        Order order = orderRepository.findByUserAndId(user, id).orElseThrow(
                () -> new EntityNotFoundException("Не вдається знайти замовлення")
        );
        order.setStatus(orderStatusRepository.findByStatus(
                OrderStatus.Status.CANCELED).orElseThrow(
                () -> new EntityNotFoundException("Не вдається знайти статус замовлення")
        ));
        return orderMapper.toDto(orderRepository.save(order));
    }

    @Override
    public Page<OrderResponseDto> findAllOrderByStatusId(Long statusId, Pageable pageable, User user) {
        Page<Order> orders = orderRepository.findAllByStatusIdAndUser(statusId, user, pageable);
        return orders.map(orderMapper::toDto);
    }

    private List<OrderItem> setOrderItemsFromShoppingCart(Order order, List<CartItem> cartItems) {
        return cartItems.stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setLaptop(cartItem.getLaptop());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            Laptop laptop = orderItem.getLaptop();
            laptop.setAmount(laptop.getAmount() - 1);
            laptopRepository.save(laptop);
            return orderItemRepository.save(orderItem);
        }).collect(Collectors.toList());
    }
}
