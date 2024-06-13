package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.shoppingcart.ShoppingCartResponseDto;
import nure.pcshop.model.ShoppingCart;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class, uses = CartItemMapper.class)
public interface ShoppingCartMapper {
    ShoppingCartResponseDto toDto(ShoppingCart shoppingCart);
}
