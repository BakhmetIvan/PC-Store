package nure.pcshop.dto.review;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponseDto {
    private Long id;
    private Long userId;
    private String firstName;
    private String lastName;
    private Float rating;
    private String comment;
    private LocalDateTime date;
}
