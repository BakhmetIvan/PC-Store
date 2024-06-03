package nure.pcshop.service.review.impl;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.review.ReviewMapper;
import nure.pcshop.model.Laptop;
import nure.pcshop.model.Review;
import nure.pcshop.model.User;
import nure.pcshop.repository.products.LaptopRepository;
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
    private final LaptopRepository laptopRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public ReviewResponseDto postReview(Long productId, Long userId, ReviewRequestDto requestDto) {
        Review review = reviewMapper.toModel(requestDto);
        review.setUser(userRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("Такого користувача немає: " + userId)
        ));
        review.setDate(LocalDateTime.now());
        Laptop laptop = laptopRepository.findById(productId).orElseThrow(
                () -> new EntityNotFoundException("Такого товару немає: " + productId)
        );
        Float averageRating = laptop.getAverageRating();
        if (averageRating == null) {
            laptop.setAverageRating(review.getRating());
        } else {
            laptop.setAverageRating((averageRating + review.getRating()) / 2);
        }
        review.setLaptop(laptop);
        laptopRepository.save(laptop);
        return reviewMapper.toDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewResponseDto> findAllReviewsByProductId(Long productId, Pageable pageable) {
        return reviewRepository.findAllByLaptopId(productId, pageable).stream()
                .map(reviewMapper::toDto)
                .toList();
    }

    @Override
    public void delete(User user, Long id) {
        reviewRepository.findReviewByUser(user).orElseThrow(
                () -> new EntityNotFoundException("Користувач не може видаляти не свої відгуки")
        );
        reviewRepository.deleteById(id);
    }
}
