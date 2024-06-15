package nure.pcshop.dto.order;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import java.math.BigDecimal;

@Data
public class OrderItemResponseDto {
    private Long id;
    private Long laptopId;
    private String LaptopTitle;
    private BigDecimal totalPrice;
    private BigDecimal laptopPrice;
    private ImageResponseDto image;
    private int quantity;
}
