package nure.pcshop.dto.shoppingcart;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ShoppingCartResponseDto {
    private Long id;
    private BigDecimal total;
    private List<CartItemResponseDto> cartItems;
}
