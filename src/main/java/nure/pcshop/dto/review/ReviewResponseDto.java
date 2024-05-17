package nure.pcshop.dto.review;

import lombok.Data;
import java.util.Date;

@Data
public class ReviewResponseDto {
    private Long id;
    private Long productId;
    private Long userId;
    private Float rating;
    private String comment;
    private Date date;
}
