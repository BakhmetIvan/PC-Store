package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.order.OrderItemResponseDto;
import nure.pcshop.model.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class, uses = ImageMapper.class)
public interface OrderItemMapper {
    @Mapping(target = "laptopId", source = "laptop.id")
    @Mapping(target = "laptopTitle", source = "laptop.name")
    @Mapping(target = "totalPrice", source = "price")
    @Mapping(target = "laptopPrice", source = "laptop.price")
    @Mapping(target = "image", source = "laptop.images", qualifiedByName = "toSingleImageDto")
    OrderItemResponseDto toDto(OrderItem orderItem);
}
