package nure.pcshop.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Data
public class UserLoginRequestDto {
    @Email
    @NotBlank
    @Length(max = 255)
    private String email;
    @NotBlank
    @Length(min = 8, max = 50)
    @ToString.Exclude
    private String password;
}
