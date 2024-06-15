package nure.pcshop.dto.order;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class OrderStatusUpdateDto {
    @NotNull
    @Positive
    private Long id;
}
