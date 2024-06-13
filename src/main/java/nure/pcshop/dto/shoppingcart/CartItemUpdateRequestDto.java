package nure.pcshop.dto.shoppingcart;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CartItemUpdateRequestDto {
    @NotNull(message = "Поле не повинно бути порожнім")
    @Positive(message = "Кількість товарів не може бути від'ємним")
    private Integer quantity;
}
