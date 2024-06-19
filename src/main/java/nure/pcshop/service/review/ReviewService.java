package nure.pcshop.service.review;

import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    ReviewResponseDto postReview(Long productId, Long userId, ReviewRequestDto requestDto);

    Page<ReviewResponseDto> findAllReviewsByProductId(Long productId, Pageable pageable);

    Page<ReviewResponseDto> findAllReviewsByUser(User user, Pageable pageable);

    void delete(User user, Long id);
}
