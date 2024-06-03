package nure.pcshop.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
public class UserLoginRequestDto {
    @Email(message = "Не правильна структура пошти")
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(max = 255, message = "Пошта не може бути більше ніж 255 символів")
    private String email;
    @NotBlank(message = "Рядок не може бути порожнім")
    @Length(min = 8, max = 50, message = "Пароль повинен бути від 8 до 50 символів")
    @ToString.Exclude
    private String password;
}
