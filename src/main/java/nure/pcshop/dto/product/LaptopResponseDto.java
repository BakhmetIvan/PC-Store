package nure.pcshop.dto.product;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import java.math.BigDecimal;

@Data
public class LaptopResponseDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private Float averageRating;
    private ImageResponseDto image;
    private int reviewsCount;
    private int amount;
}
