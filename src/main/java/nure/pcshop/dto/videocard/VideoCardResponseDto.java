package nure.pcshop.dto.videocard;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class VideoCardResponseDto {
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
}
