package nure.pcshop.service.review.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.review.ReviewMapper;
import nure.pcshop.model.Product;
import nure.pcshop.model.Review;
import nure.pcshop.repository.products.ProductRepository;
import nure.pcshop.repository.review.ReviewRepository;
import nure.pcshop.repository.user.UserRepository;
import nure.pcshop.service.review.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public ReviewResponseDto postReview(Long productId, Long userId, ReviewRequestDto requestDto) {
        Review review = reviewMapper.toModel(requestDto);
        review.setUser(userRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("Такого користувача немає: " + userId)
        ));
        review.setDate(LocalDateTime.now());
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Такого товару немає: " + productId)
        );
        Float averageRating = product.getAverageRating();
        if (averageRating == null) {
            product.setAverageRating(review.getRating());
        } else {
            product.setAverageRating((averageRating + review.getRating()) / 2);
        }
        review.setProduct(product);
        productRepository.save(product);
        return reviewMapper.toDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewResponseDto> findAllReviewsByProductId(Long productId, Pageable pageable) {
        return reviewRepository.findAllByProductId(productId, pageable).stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Override
    public void delete(Long id) {
        userRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Такого відгуку немає: " + id)
        );
        reviewRepository.deleteById(id);
    }
}
