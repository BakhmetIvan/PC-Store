package nure.pcshop.dto.user;

import lombok.Data;
import java.util.Date;

@Data
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Date birthday;
    private String deliveryAddress;
}
