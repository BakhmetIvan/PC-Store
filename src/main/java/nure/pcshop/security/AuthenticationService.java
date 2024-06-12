package nure.pcshop.security;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.user.UserLoginRequestDto;
import nure.pcshop.dto.user.UserLoginResponseDto;
import nure.pcshop.repository.UserRepository;
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
                        "Не вдаеється знайти користувача за поштою: " + requestDto.getEmail()));

        String jwt = jwtUtil.generateToken(user);
        return new UserLoginResponseDto(jwt);
    }
}
