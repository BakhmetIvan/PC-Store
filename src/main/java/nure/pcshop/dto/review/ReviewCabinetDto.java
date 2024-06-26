package nure.pcshop.dto.review;

import lombok.Data;
import nure.pcshop.dto.image.ImageResponseDto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReviewCabinetDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private int rating;
    private String comment;
    private LocalDateTime date;
    private Long laptopId;
    private String laptopName;
    private BigDecimal laptopPrice;
    private ImageResponseDto laptopImage;
}
