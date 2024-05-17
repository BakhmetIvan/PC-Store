package nure.pcshop.dto.review;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.util.Date;

@Data
public class ReviewRequestDto {
    @NotNull
    @Positive
    private Long productId;
    @NotNull
    @Positive
    private Long userId;
    @NotNull
    @Size(min = 1, max = 5)
    private Float rating;
    private String comment;
    @NotNull
    private Date date;
}
