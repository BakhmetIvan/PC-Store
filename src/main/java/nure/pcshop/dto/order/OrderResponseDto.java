package nure.pcshop.dto.order;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponseDto {
    private Long id;
    private String status;
    private Long userId;
    private String firstName;
    private String lastName;
    private String patronymic;
    private String email;
    private String phoneNumber;
    private String city;
    private String address;
    private String deliveryType;
    private String paymentType;
    private BigDecimal deliveryPrice;
    private BigDecimal total;
    private LocalDateTime orderDate;
    private List<OrderItemResponseDto> orderItems;
}
