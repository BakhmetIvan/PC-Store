package nure.pcshop.dto.shoppingcart;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartItemResponseDto {
    private Long id;
    private Long laptopId;
    private String LaptopTitle;
    private BigDecimal price;
    private int quantity;
}
