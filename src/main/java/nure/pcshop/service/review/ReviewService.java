package nure.pcshop.service.review;

import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ReviewService {
    ReviewResponseDto postReview(Long productId, Long userId, ReviewRequestDto requestDto);

    List<ReviewResponseDto> findAllReviewsByProductId(Long productId, Pageable pageable);

    void delete(Long id);
}
