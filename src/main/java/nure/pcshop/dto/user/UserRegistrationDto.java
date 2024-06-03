package nure.pcshop.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;
import nure.pcshop.validation.FieldMatch;
import org.hibernate.validator.constraints.Length;

@Data
@FieldMatch.List({
        @FieldMatch(first = "password",
                second = "repeatPassword",
                message = "Паролі не співпадають")
})
public class UserRegistrationDto {
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Ім'я не може бути більше ніж 255 символів")
    private String firstName;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Прізвище не може бути більше ніж 255 символів")
    private String lastName;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Email(message = "Не правильна структура пошти")
    @Length(max = 255, message = "Пошта не може бути більше ніж 255 символів")
    private String email;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(min = 7, max = 15, message = "Номер телефону повинен бути від 7 до 17 цифр")
    private String phoneNumber;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(min = 8, max = 50, message = "Пароль повинен бути від 8 до 50 символів")
    @ToString.Exclude
    private String password;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(min = 8, max = 50, message = "Пароль повинен бути від 8 до 50 символів")
    @ToString.Exclude
    private String repeatPassword;
}
