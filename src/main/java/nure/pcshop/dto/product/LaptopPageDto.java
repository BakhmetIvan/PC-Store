package nure.pcshop.dto.product;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class LaptopPageDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Float averageRating;
    private Float diagonal;
    private String screenType;
    private int reviewsCount;
    private int refreshRate;
    private int resolution;
    private int amount;
    private Map<Integer, Integer> stars;
    private List<ImageResponseDto> images;
    private List<ReviewResponseDto> reviews;
}
