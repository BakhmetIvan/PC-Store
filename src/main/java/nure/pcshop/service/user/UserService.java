package nure.pcshop.service.user;

import nure.pcshop.dto.review.ReviewCabinetDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.dto.user.UserInfoUpdateDto;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.exception.RegistrationException;
import nure.pcshop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    UserResponseDto register(UserRegistrationDto requestDto) throws RegistrationException;

    UserResponseDto getInfo(User user);

    UserResponseDto updateUserInfo(User user, UserInfoUpdateDto updateDto);

    Page<ReviewCabinetDto> findAllUserReviews(User user, Pageable pageable);
}
