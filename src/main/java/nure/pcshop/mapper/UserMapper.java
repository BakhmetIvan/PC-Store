package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.user.UserInfoUpdateDto;
import nure.pcshop.dto.user.UserRegistrationDto;
import nure.pcshop.dto.user.UserResponseDto;
import nure.pcshop.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = MapperConfig.class)
public interface UserMapper {
    UserResponseDto toDto(User user);
    @Mapping(target = "password", source = "password")
    User toModel(UserRegistrationDto registrationDto);

    void updateUserFromDto(@MappingTarget User user, UserInfoUpdateDto updateDto);
}
