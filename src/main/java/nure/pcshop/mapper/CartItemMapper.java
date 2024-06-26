package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.shoppingcart.CartItemRequestDto;
import nure.pcshop.dto.shoppingcart.CartItemResponseDto;
import nure.pcshop.model.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class, uses = {ImageMapper.class})
public interface CartItemMapper {
    @Mapping(target = "laptop.id", source = "laptopId")
    CartItem toModel(CartItemRequestDto requestDto);

    @Mapping(target = "laptopId", source = "laptop.id")
    @Mapping(target = "laptopTitle", source = "laptop.name")
    @Mapping(target = "totalPrice", source = "price")
    @Mapping(target = "laptopPrice", source = "laptop.price")
    @Mapping(target = "image", source = "laptop.images", qualifiedByName = "toSingleImageDto")
    CartItemResponseDto toDto(CartItem cartItem);
}
