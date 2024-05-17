package nure.pcshop.service.user.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.exception.RegistrationException;
import nure.pcshop.mapper.user.UserMapper;
import nure.pcshop.model.Role;
import nure.pcshop.model.User;
import nure.pcshop.repository.role.RoleRepository;
import nure.pcshop.repository.user.UserRepository;
import nure.pcshop.service.user.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
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
        user = userRepository.save(user);
        return userMapper.toDto(user);
    }
}
