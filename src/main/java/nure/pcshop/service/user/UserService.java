package nure.pcshop.service.user;

import nure.pcshop.dto.UserRegistrationDto;
import nure.pcshop.dto.UserResponseDto;
import nure.pcshop.exception.RegistrationException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserResponseDto register(UserRegistrationDto requestDto) throws RegistrationException;
}
