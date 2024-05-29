package nure.pcshop.dto.videocard;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import java.math.BigDecimal;
import java.util.List;

@Data
public class VideoCardWithAllFieldsDto {
    private Long id;
    private String name;
    private String description;
    private String graphicChip;
    private int memory;
    private int bitSize;
    private int minCapacity;
    private Float length;
    private BigDecimal price;
    private String brandName;
    private String country;
    private int warrantyPeriod;
    private Float averageRating;
    private int amount;
    private List<ImageResponseDto> images;
    private List<ReviewResponseDto> reviews;
}
