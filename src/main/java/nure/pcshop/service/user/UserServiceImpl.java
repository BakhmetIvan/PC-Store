package nure.pcshop.service.user;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.exception.RegistrationException;
import nure.pcshop.mapper.UserMapper;
import nure.pcshop.model.Role;
import nure.pcshop.model.ShoppingCart;
import nure.pcshop.model.User;
import nure.pcshop.repository.RoleRepository;
import nure.pcshop.repository.UserRepository;
import nure.pcshop.repository.shoppingcart.ShoppingCartRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final ShoppingCartRepository shoppingCartRepository;

    @Override
    public UserResponseDto register(UserRegistrationDto requestDto) throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException("Email already registered: " + requestDto.getEmail());
        }
        if (userRepository.findByPhoneNumber(requestDto.getPhoneNumber()).isPresent()) {
            throw new RegistrationException("Phone number already used: " + requestDto.getPhoneNumber());
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
}
