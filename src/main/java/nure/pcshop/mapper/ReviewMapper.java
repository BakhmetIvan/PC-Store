package nure.pcshop.mapper;

import nure.pcshop.config.MapperConfig;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Named("setReviewsStars")
    default Map<Integer, Integer> setReviewsStars(List<Review> reviews) {
        Map<Integer, Integer> starsCount = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            starsCount.put(i, 0);
        }
        for (Review review : reviews) {
            int rating = Math.round(review.getRating());
            starsCount.put(rating, starsCount.get(rating) + 1);
        }
        return starsCount;
    }
}
