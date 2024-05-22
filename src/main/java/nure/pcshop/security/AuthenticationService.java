package nure.pcshop.security;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.UserLoginRequestDto;
import nure.pcshop.dto.UserLoginResponseDto;
import nure.pcshop.repository.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public UserLoginResponseDto authenticate(UserLoginRequestDto requestDto) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword())
        );
        UserDetails user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Користувача с такою поштою не зареєстровано: " + requestDto.getEmail())
                );

        String jwt = jwtUtil.generateToken(user);
        return new UserLoginResponseDto(jwt);
    }
}
