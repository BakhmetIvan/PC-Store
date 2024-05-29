package nure.pcshop.mapper.review;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface ReviewMapper {
    Review toModel(ReviewRequestDto requestDto);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "userName", source = "user.name")
    ReviewResponseDto toDto(Review review);
}
