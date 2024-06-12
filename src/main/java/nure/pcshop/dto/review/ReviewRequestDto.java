package nure.pcshop.dto.review;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequestDto {
    @NotNull
    @DecimalMin(value = "1")
    @DecimalMax(value = "5")
    private int rating;
    private String comment;
}
