package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.shoppingcart.CartItemRequestDto;
import nure.pcshop.dto.shoppingcart.CartItemResponseDto;
import nure.pcshop.model.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface CartItemMapper {
    @Mapping(target = "laptop.id", source = "laptopId")
    CartItem toModel(CartItemRequestDto requestDto);

    @Mapping(target = "laptopId", source = "laptop.id")
    @Mapping(target = "laptopTitle", source = "laptop.name")
    CartItemResponseDto toDto(CartItem cartItem);
}
