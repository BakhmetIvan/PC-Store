package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.order.OrderRequestDto;
import nure.pcshop.dto.order.OrderResponseDto;
import nure.pcshop.model.DeliveryType;
import nure.pcshop.model.Order;
import nure.pcshop.model.OrderStatus;
import nure.pcshop.model.PaymentType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(config = MapperConfig.class, uses = OrderItemMapper.class)
public interface OrderMapper {
    Order toModel(OrderRequestDto requestDto);

    @Mapping(source = "status", target = "status", qualifiedByName = "statusToString")
    @Mapping(source = "deliveryType", target = "deliveryType", qualifiedByName = "deliveryTypeToString")
    @Mapping(source = "paymentType", target = "paymentType", qualifiedByName = "paymentTypeToString")
    @Mapping(source = "deliveryType.price", target = "deliveryPrice")
    @Mapping(source = "user.id", target = "userId")
    OrderResponseDto toDto(Order order);

    @Named("statusToString")
    default String map(OrderStatus value) {
        return value.getStatus().getValue();
    }

    @Named("deliveryTypeToString")
    default String map(DeliveryType value) {
        return value.getDelivery().getValue();
    }

    @Named("paymentTypeToString")
    default String map(PaymentType value) {
        return value.getPayment().getValue();
    }
}
