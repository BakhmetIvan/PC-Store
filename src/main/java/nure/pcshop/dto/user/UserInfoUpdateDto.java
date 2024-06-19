package nure.pcshop.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import java.util.Date;

@Data
public class UserInfoUpdateDto {
    @NotBlank(message = "Ім'я не може бути порожнім")
    @Length(max = 255, message = "Ім'я не може бути більше ніж 255 символів")
    private String firstName;
    @NotBlank(message = "Прізвище не може бути порожнім")
    @Length(max = 255, message = "Прізвище не може бути більше ніж 255 символів")
    private String lastName;
    @NotBlank(message = "Пошта не може бути порожнім")
    @Email(message = "Не правильна структура пошти")
    @Length(max = 255, message = "Пошта не може бути більше ніж 255 символів")
    private String email;
    @NotBlank(message = "Номер не може бути порожнім")
    @Length(min = 7, max = 15, message = "Номер телефону повинен бути від 7 до 17 цифр")
    private String phoneNumber;
    private Date birthday;
}
