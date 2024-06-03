package nure.pcshop.mapper.review;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

@Mapper(config = MapperConfig.class)
public interface ReviewMapper {
    Review toModel(ReviewRequestDto requestDto);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "firstName", source = "user.firstName")
    @Mapping(target = "lastName", source = "user.lastName")
    ReviewResponseDto toDto(Review review);

    @Named("setReviewsCount")
    default int setReviewsCount(List<Review> reviews) {
        return reviews.size();
    }
}
