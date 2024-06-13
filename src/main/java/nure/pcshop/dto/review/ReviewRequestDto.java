package nure.pcshop.dto.review;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ReviewRequestDto {
    @NotNull
    @DecimalMin(value = "1", message = "Оцінка не може бути менше ніж 1")
    @DecimalMax(value = "5", message = "Оцінка не може бути більше ніж 5")
    private int rating;
    @Size(max = 500, message = "Максимальна кількість символів 500")
    private String comment;
}
