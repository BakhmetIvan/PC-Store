package nure.pcshop.dto.shoppingcart;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import java.math.BigDecimal;

@Data
public class CartItemResponseDto {
    private Long id;
    private Long laptopId;
    private String LaptopTitle;
    private BigDecimal totalPrice;
    private BigDecimal laptopPrice;
    private ImageResponseDto image;
    private int quantity;
}
