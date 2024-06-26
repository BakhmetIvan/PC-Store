package nure.pcshop.dto.user;

import lombok.Data;
import nure.pcshop.model.Role;

@Data
public class UserLoginResponseDto {
    private String token;
    private String role;

    public UserLoginResponseDto(String token, Role role) {
        this.token = token;
        this.role = role.getName().name();
    }
}
