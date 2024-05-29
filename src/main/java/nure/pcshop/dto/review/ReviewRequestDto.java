package nure.pcshop.dto.review;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequestDto {
    @NotNull
    @DecimalMin(value = "1.0", inclusive = false)
    @DecimalMax(value = "5.0")
    private Float rating;
    private String comment;
}
