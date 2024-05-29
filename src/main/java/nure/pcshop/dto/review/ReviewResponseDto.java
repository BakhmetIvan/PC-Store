package nure.pcshop.dto.review;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponseDto {
    private Long id;
    private Long productId;
    private Long userId;
    private String userName;
    private Float rating;
    private String comment;
    private LocalDateTime date;
}
