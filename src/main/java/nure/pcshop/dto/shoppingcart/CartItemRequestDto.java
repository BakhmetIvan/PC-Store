package nure.pcshop.dto.shoppingcart;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CartItemRequestDto {
    @NotNull(message = "Поле не повинно бути порожнім")
    @Positive(message = "Айди не може бути від'ємним")
    private Long laptopId;
    @NotNull(message = "Поле не повинно бути порожнім")
    @Positive(message = "Кількість товарів не може бути від'ємним")
    private int quantity;
}
