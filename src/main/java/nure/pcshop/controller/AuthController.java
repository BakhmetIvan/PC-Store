package nure.pcshop.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.user.UserLoginRequestDto;
import nure.pcshop.dto.user.UserLoginResponseDto;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.exception.RegistrationException;
import nure.pcshop.security.AuthenticationService;
import nure.pcshop.service.user.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/registration")
    @Operation(summary = "Register a user", description = "Register a new user if it is not exist in the db")
    public UserResponseDto register(@RequestBody @Valid UserRegistrationDto request) throws RegistrationException {
        return userService.register(request);
    }


    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Endpoint for logging in a user")
    public UserLoginResponseDto login(@RequestBody UserLoginRequestDto requestDto) {
        return authenticationService.authenticate(requestDto);
    }
}
