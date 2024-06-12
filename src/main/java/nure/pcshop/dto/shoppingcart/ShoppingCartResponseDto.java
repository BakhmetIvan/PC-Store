package nure.pcshop.dto.shoppingcart;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Set;

@Data
public class ShoppingCartResponseDto {
    private Long id;
    private BigDecimal total;
    private Set<CartItemResponseDto> cartItems;
}
