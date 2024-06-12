package nure.pcshop.dto.shoppingcart;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CartItemRequestDto {
    @NotNull
    @Positive
    private Long laptopId;
    @NotNull
    @Positive
    private int quantity;
}
