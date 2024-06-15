package nure.pcshop.dto.order;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class OrderRequestDto {
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Ім'я не може бути більше ніж 255 символів")
    private String firstName;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Прізвище не може бути більше ніж 255 символів")
    private String lastName;
    @Length(max = 255, message = "По батькові не може бути більше ніж 255 символів")
    private String patronymic;
    @Email(message = "Не правильна структура пошти")
    @Length(max = 255, message = "Пошта не може бути більше ніж 255 символів")
    private String email;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(min = 7, max = 15, message = "Номер телефону повинен бути від 7 до 17 цифр")
    private String phoneNumber;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Місто не може бути більше ніж 255 символів")
    private String city;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 500, message = "Адреса не може бути більше ніж 500 символів")
    private String address;
    @NotNull
    @Positive
    private Long deliveryId;
    @NotNull
    @Positive
    private Long paymentId;
}
