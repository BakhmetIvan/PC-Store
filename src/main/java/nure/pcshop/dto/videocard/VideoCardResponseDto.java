package nure.pcshop.dto.videocard;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import java.math.BigDecimal;

@Data
public class VideoCardResponseDto {
    private Long id;
    private String name;
    private BigDecimal price;
    private Float averageRating;
    private ImageResponseDto image;
    private int amount;
}
