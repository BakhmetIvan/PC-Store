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
                message = "The password fields don't match")
})
public class UserRegistrationDto {
    @NotBlank
    @Length(max = 255)
    private String firstName;
    @NotBlank
    @Length(max = 255)
    private String lastName;
    @NotBlank
    @Email
    @Length(max = 255)
    private String email;
    @NotBlank
    @Length(min = 7, max = 15)
    private String phoneNumber;
    @NotBlank
    @Length(min = 8, max = 50)
    @ToString.Exclude
    private String password;
    @NotBlank
    @Length(min = 8, max = 50)
    @ToString.Exclude
    private String repeatPassword;
}
