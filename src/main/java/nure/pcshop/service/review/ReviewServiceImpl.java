package nure.pcshop.service.review;

import lombok.RequiredArgsConstructor;
import nure.pcshop.dto.review.ReviewRequestDto;
import nure.pcshop.dto.review.ReviewResponseDto;
import nure.pcshop.exception.EntityNotFoundException;
import nure.pcshop.mapper.ReviewMapper;
import nure.pcshop.model.Laptop;
import nure.pcshop.model.Review;
import nure.pcshop.model.User;
import nure.pcshop.repository.products.LaptopRepository;
import nure.pcshop.repository.ReviewRepository;
import nure.pcshop.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final LaptopRepository laptopRepository;
    private final UserRepository userRepository;

    @Transactional
    @Override
    public ReviewResponseDto postReview(Long laptopId, Long userId, ReviewRequestDto requestDto) {
        Laptop laptop = laptopRepository.findById(laptopId).orElseThrow(
                () -> new EntityNotFoundException("Такого товару немає: " + laptopId)
        );
        Review review = reviewMapper.toModel(requestDto);
        review.setUser(userRepository.findById(userId).orElseThrow(
                () -> new EntityNotFoundException("Такого користувача немає: " + userId)
        ));
            review.setDate(LocalDateTime.now());
        review.setLaptop(laptop);
        review = reviewRepository.save(review);
        if (laptop.getAverageRating() == null) {
            laptop.setAverageRating(review.getRating());
        } else {
            laptop.setAverageRating(reviewRepository.calculateAverageRating(laptopId));
        }
        laptopRepository.save(laptop);
        return reviewMapper.toDto(review);
    }

    @Override
    public Page<ReviewResponseDto> findAllReviewsByProductId(Long productId, Pageable pageable) {
        return reviewRepository.findAllByLaptopId(productId, pageable)
                .map(reviewMapper::toDto);
    }

    @Override
    public Page<ReviewResponseDto> findAllReviewsByUser(User user, Pageable pageable) {
        return reviewRepository.findAllByUser(user, pageable)
                .map(reviewMapper::toDto);
    }

    @Override
    public void delete(User user, Long id) {
        reviewRepository.findReviewByUserAndId(user, id).orElseThrow(
                () -> new EntityNotFoundException("Користувач не може видаляти не свої відгуки")
        );
        reviewRepository.deleteById(id);
    }
}
