package nure.pcshop.service.user;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.review.ReviewCabinetDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.dto.user.UserInfoUpdateDto;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.exception.RegistrationException;
import nure.pcshop.mapper.UserMapper;
import nure.pcshop.model.Role;
import nure.pcshop.model.ShoppingCart;
import nure.pcshop.model.User;
import nure.pcshop.repository.RoleRepository;
import nure.pcshop.repository.UserRepository;
import nure.pcshop.repository.shoppingcart.ShoppingCartRepository;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final ShoppingCartRepository shoppingCartRepository;
    private final ReviewService reviewService;

    @Transactional
    @Override
    public UserResponseDto register(UserRegistrationDto requestDto) throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException("Пошта вже зареєстрована: " + requestDto.getEmail());
        }
        if (userRepository.findByPhoneNumber(requestDto.getPhoneNumber()).isPresent()) {
            throw new RegistrationException("Номер телефона вже використовується: " + requestDto.getPhoneNumber());
        }
        User user = userMapper.toModel(requestDto);
        user.setRole(roleRepository.findByName(Role.RoleName.ROLE_USER));
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        ShoppingCart shoppingCart = new ShoppingCart();
        user = userRepository.save(user);
        shoppingCart.setUser(user);
        shoppingCart.setTotal(BigDecimal.ZERO);
        shoppingCartRepository.save(shoppingCart);
        return userMapper.toDto(user);
    }

    @Override
    public UserResponseDto getInfo(User user) {
        return userMapper.toDto(userRepository.findByEmail(user.getEmail()).orElseThrow(
                () -> new EntityNotFoundException("Не можливо знайти користувача"))
        );

    }

    @Transactional
    @Override
    public UserResponseDto updateUserInfo(User user, UserInfoUpdateDto updateDto) {
        if (userRepository.findByEmail(updateDto.getEmail()).isPresent()
                && !updateDto.getEmail().equals(user.getEmail())) {
            throw new RuntimeException("Пошта вже зареєстрована: " +
                    updateDto.getEmail());
        }
        if (userRepository.findByPhoneNumber(updateDto.getPhoneNumber()).isPresent()
                && !updateDto.getPhoneNumber().equals(user.getPhoneNumber())) {
            throw new RuntimeException("Номер телефона вже використовується: " +
                    updateDto.getPhoneNumber());
        }
        userMapper.updateUserFromDto(user, updateDto);
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public Page<ReviewCabinetDto> findAllUserReviews(User user, Pageable pageable) {
        return reviewService.findAllReviewsByUser(user, pageable);
    }
}
